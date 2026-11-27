/**
 * Đồng bộ kênh YouTube -> tab "Video" của sheet quản lý video.
 *
 * Cài: mở sheet > Tiện ích mở rộng > Apps Script, dán toàn bộ file này vào Code.gs,
 * thêm dịch vụ "YouTube Data API v3" (mã nhận dạng: YouTube), lưu, chạy syncYouTube một lần để cấp quyền.
 * Hướng dẫn đầy đủ: scripts/apps-script/README.md.
 *
 * Chỉ ghi các cột YouTube (trạng thái, số tập, giờ đăng, link, lượt xem, thời lượng, tiêu đề YouTube).
 * Các cột khác (Sản xuất, TikTok, Ghi chú) không bị đụng.
 *
 * Ghép video với dòng theo thứ tự:
 *   1. ID video đã có trong cột Link YouTube
 *   2. Số trong tiêu đề ("Quýt Nhỏ Audio 0009") khớp cột "Số tập trên kênh"
 *   3. Tiêu đề YouTube gần giống một trong các tiêu đề ở cột "Tiêu đề dự kiến (dang-bai)"
 *      (chính + 2 A/B, mỗi dòng một tiêu đề) hoặc cột "Tiêu đề truyện (repo)"
 * Video không ghép được ghi vào tab "Chưa ghép": dán link của nó vào cột Link YouTube
 * của dòng đúng, lần đồng bộ sau sẽ tự nhận.
 */

const CFG = {
  sheet: 'Video',
  overview: 'Tổng quan',
  unmatchedSheet: 'Chưa ghép',
  syncLabel: 'Đồng bộ YouTube lúc',
  col: {
    code: 'Mã',
    title: 'Tiêu đề truyện (repo)',
    duration: 'Thời lượng',
    yt: 'YouTube',
    no: 'Số tập trên kênh',
    time: 'Giờ đăng YouTube (giờ VN)',
    link: 'Link YouTube',
    views: 'Lượt xem',
    ytTitle: 'Tiêu đề YouTube',
    planned: 'Tiêu đề dự kiến',
  },
  status: { public: 'Đã công khai', scheduled: 'Đã lên lịch', uploaded: 'Đã tải lên' },
  minSimilarity: 0.5, // điểm giống tiêu đề tối thiểu (0..1) để ghép theo bước 4
  minGap: 0.1,        // dòng giống nhất phải hơn dòng thứ hai ít nhất chừng này
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Quýt Nhỏ Audio')
    .addItem('Đồng bộ YouTube ngay', 'syncYouTube')
    .addItem('Bật tự đồng bộ mỗi giờ', 'enableHourlySync')
    .addItem('Tắt tự đồng bộ', 'disableHourlySync')
    .addToUi();
}

function enableHourlySync() {
  disableHourlySync();
  ScriptApp.newTrigger('syncYouTube').timeBased().everyHours(1).create();
  syncYouTube();
}

function disableHourlySync() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'syncYouTube')
    .forEach((t) => ScriptApp.deleteTrigger(t));
}

function syncYouTube() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    run_();
  } finally {
    lock.releaseLock();
  }
}

function run_() {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(CFG.sheet);
  if (!sh) throw new Error('Không thấy tab "' + CFG.sheet + '"');

  const data = sh.getDataRange().getValues();
  const header = data[0].map((h) => String(h).trim());
  const c = {};
  for (const [key, name] of Object.entries(CFG.col)) {
    c[key] = header.findIndex((h) => h === name || h.startsWith(name + ' ('));
  }
  ['code', 'yt', 'link'].forEach((k) => {
    if (c[k] < 0) throw new Error('Thiếu cột "' + CFG.col[k] + '" ở hàng 1 tab ' + CFG.sheet);
  });

  const rows = data.slice(1);
  const videos = fetchVideos_();

  // Dòng đã có link thuộc về video đó.
  const owner = new Map(); // chỉ số dòng -> id video
  const byId = {};
  const byNo = {};
  rows.forEach((r, i) => {
    const id = videoId_(r[c.link]);
    if (id) {
      byId[id] = i;
      owner.set(i, id);
    }
    if (c.no >= 0 && r[c.no] !== '' && r[c.no] !== null) byNo[Number(r[c.no])] = i;
  });
  const free = (i, id) => i !== undefined && (!owner.has(i) || owner.get(i) === id);

  const matched = new Map(); // id video -> chỉ số dòng
  const rest = [];
  for (const v of videos) {
    let i = byId[v.id];
    if (i === undefined && v.no && free(byNo[v.no], v.id)) i = byNo[v.no];
    if (i === undefined) {
      rest.push(v);
      continue;
    }
    matched.set(v.id, i);
    owner.set(i, v.id);
  }

  // Bước 3: so tiêu đề với các dòng chưa có video.
  const unmatched = [];
  if (c.title >= 0 || c.planned >= 0) {
    const rowTokens = rows.map((r) => {
      const list = [];
      if (c.planned >= 0) String(r[c.planned] || '').split('\n').forEach((t) => list.push(t));
      if (c.title >= 0) list.push(r[c.title]);
      return list.map(tokens_).filter((t) => t.size);
    });
    for (const v of rest) {
      const vt = tokens_(v.title);
      let best = -1, bestScore = 0, second = 0;
      rows.forEach((r, i) => {
        if (owner.has(i)) return;
        const s = Math.max(0, ...rowTokens[i].map((t) => dice_(vt, t)));
        if (s > bestScore) {
          second = bestScore;
          bestScore = s;
          best = i;
        } else if (s > second) {
          second = s;
        }
      });
      if (best >= 0 && bestScore >= CFG.minSimilarity && bestScore - second >= CFG.minGap) {
        matched.set(v.id, best);
        owner.set(best, v.id);
      } else {
        unmatched.push(v);
      }
    }
  } else {
    unmatched.push(...rest);
  }

  const vById = {};
  videos.forEach((v) => (vById[v.id] = v));
  for (const [id, i] of matched) {
    const v = vById[id];
    const r = rows[i];
    r[c.yt] = v.status;
    r[c.link] = 'https://www.youtube.com/watch?v=' + v.id;
    if (c.no >= 0 && v.no) r[c.no] = v.no;
    if (c.time >= 0) r[c.time] = v.time;
    if (c.views >= 0) r[c.views] = v.status === CFG.status.public ? v.views : '';
    if (c.duration >= 0) r[c.duration] = v.duration;
    if (c.ytTitle >= 0) r[c.ytTitle] = v.title;
  }

  // Ghi từng cột YouTube, không đụng các cột khác.
  const n = rows.length;
  if (n) {
    if (c.duration >= 0) sh.getRange(2, c.duration + 1, n, 1).setNumberFormat('@');
    ['yt', 'no', 'time', 'link', 'views', 'duration', 'ytTitle'].forEach((k) => {
      if (c[k] < 0) return;
      sh.getRange(2, c[k] + 1, n, 1).setValues(rows.map((r) => [r[c[k]]]));
    });
  }

  writeUnmatched_(ss, unmatched);
  writeSyncTime_(ss, videos.length, matched.size, unmatched.length);
}

function fetchVideos_() {
  const ch = YouTube.Channels.list('contentDetails', { mine: true });
  if (!ch.items || !ch.items.length) throw new Error('Tài khoản đang đăng nhập không có kênh YouTube');
  const uploads = ch.items[0].contentDetails.relatedPlaylists.uploads;

  const ids = [];
  let token;
  do {
    const res = YouTube.PlaylistItems.list('contentDetails', {
      playlistId: uploads,
      maxResults: 50,
      pageToken: token,
    });
    (res.items || []).forEach((it) => ids.push(it.contentDetails.videoId));
    token = res.nextPageToken;
  } while (token);

  const out = [];
  for (let k = 0; k < ids.length; k += 50) {
    const res = YouTube.Videos.list('snippet,status,contentDetails,statistics', {
      id: ids.slice(k, k + 50).join(','),
    });
    (res.items || []).forEach((v) => out.push(parseVideo_(v)));
  }
  return out;
}

function parseVideo_(v) {
  const s = v.status || {};
  const sn = v.snippet || {};
  let status, time;
  if (s.privacyStatus === 'public') {
    status = CFG.status.public;
    time = sn.publishedAt;
  } else if (s.publishAt) {
    status = CFG.status.scheduled;
    time = s.publishAt;
  } else {
    status = CFG.status.uploaded;
    time = '';
  }
  const title = sn.title || '';
  const no = title.match(/Audio\s*(\d{3,5})/i);
  return {
    id: v.id,
    title: title,
    status: status,
    privacy: s.privacyStatus || '',
    time: time ? new Date(time) : '',
    no: no ? Number(no[1]) : null,
    views: Number((v.statistics || {}).viewCount || 0),
    duration: duration_((v.contentDetails || {}).duration),
  };
}

function writeUnmatched_(ss, list) {
  let sh = ss.getSheetByName(CFG.unmatchedSheet);
  if (!list.length) {
    if (sh) sh.clear().getRange(1, 1).setValue('Không còn video nào chưa ghép.');
    return;
  }
  if (!sh) sh = ss.insertSheet(CFG.unmatchedSheet);
  sh.clear();
  const rows = [['Link YouTube', 'Tiêu đề YouTube', 'Trạng thái', 'Giờ đăng (giờ VN)', 'Số trong tiêu đề']].concat(
    list.map((v) => ['https://www.youtube.com/watch?v=' + v.id, v.title, v.status + ' (' + v.privacy + ')', v.time, v.no || ''])
  );
  sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sh.getRange(2, 4, rows.length - 1, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange(1, 1, 1, rows[0].length).setFontWeight('bold');
  sh.getRange(rows.length + 2, 1).setValue(
    'Cách ghép: dán link vào cột Link YouTube ở dòng đúng của tab ' + CFG.sheet + ', rồi bấm Đồng bộ YouTube ngay.'
  );
}

function writeSyncTime_(ss, total, matched, unmatched) {
  const sh = ss.getSheetByName(CFG.overview);
  if (!sh) return;
  const labels = sh.getRange(1, 1, sh.getLastRow() || 1, 1).getValues();
  let row = labels.findIndex((r) => String(r[0]).trim() === CFG.syncLabel) + 1;
  if (!row) {
    row = sh.getLastRow() + 1;
    sh.getRange(row, 1).setValue(CFG.syncLabel);
  }
  sh.getRange(row, 2).setValue(new Date()).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange(row, 3).setValue(total + ' video, ghép ' + matched + ', chưa ghép ' + unmatched);
}

function videoId_(url) {
  const m = String(url || '').match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function duration_(iso) {
  const m = String(iso || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = Number(m[1] || 0), mi = Number(m[2] || 0), s = Number(m[3] || 0);
  const pad = (x) => String(x).padStart(2, '0');
  return h ? h + ':' + pad(mi) + ':' + pad(s) : mi + ':' + pad(s);
}

function tokens_(s) {
  const t = String(s || '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/qu[ýy]t\s*nh[ỏo]\s*audio\s*\d*\s*\|?/, '');
  return new Set(t.match(/[\p{L}\p{N}]+/gu) || []);
}

function dice_(a, b) {
  if (!a.size || !b.size) return 0;
  let n = 0;
  a.forEach((x) => {
    if (b.has(x)) n++;
  });
  return (2 * n) / (a.size + b.size);
}
