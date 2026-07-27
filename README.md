# Solar Panel Vietnam Presentation

Website trinh chieu 24 slide ve Solar Panel, dung Vite + React + TypeScript + GSAP. Layout duoc giu co dinh trong stage 960 x 540, sau do scale dong deu theo man hinh. Noi dung chu, 24 anh nen trong `nen`, 78 icon PNG trong `icons`, va vi tri layout khong bi thay doi khi them video nen.

## Mo truc tiep bang index.html

Co the double-click file `index.html` o thu muc goc du an de mo truc tiep, khong can server.

Che do nay load bundle tu:

```text
dist/assets/app.js
dist/assets/app.css
```

Video production duoc Vite copy vao:

```text
dist/videos/pingpong/slide_01.mp4
...
dist/videos/pingpong/slide_24.mp4
```

Neu sua code hoac video, chay lai:

```bash
npm run build
```

Sau do reload lai `index.html` trong trinh duyet.

## Cai dat

```bash
npm install
```

## Chay local

```bash
npm run dev
```

Mo URL Vite in ra, thuong la:

```text
http://127.0.0.1:5173/
```

Mo thang tung slide bang hash:

```text
http://127.0.0.1:5173/#slide-01
http://127.0.0.1:5173/#slide-24
```

## Build production

```bash
npm run build
```

Build thanh cong se tao `dist/` va `dist/index.html`.

## Video nen nguon

Folder video nguon la:

```text
videotonghop/
```

Quy tac dat ten: moi file can co so slide tu 1 den 24 trong ten file. Vi du:

```text
1_1080p_202607271623.mp4
2_1080p_202607271624.mp4
...
24_1080p_202607271646.mp4
```

Script se lay so dau tien trong ten file, sort theo so tu nhien, va map:

```text
1  -> slide_01.mp4 -> Slide 01
2  -> slide_02.mp4 -> Slide 02
...
24 -> slide_24.mp4 -> Slide 24
```

Ho tro video nguon `.mp4`, `.mov`, `.webm`. Khong sua va khong xoa video goc trong `videotonghop`.

## Tao video ping-pong

Chay:

```bash
npm run build:videos
```

Script `scripts/build-pingpong-videos.mjs` se:

- Kiem tra FFmpeg va FFprobe.
- Doc 24 video trong `videotonghop`.
- Xac nhan du so 1 den 24, khong trung, khong thieu.
- FFprobe tung video: duration, resolution, aspect ratio, frame rate, codec, pixel format, audio.
- Yeu cau moi video nguon dai it nhat 8 giay.
- Lay doan 0 -> 8 giay.
- Tao video 0 -> 8 -> 0 bang filter `reverse` cua FFmpeg.
- Bo audio bang `-an`.
- Xuat H.264, `yuv420p`, `movflags +faststart`.
- Bo qua file dau ra neu video nguon khong thay doi va output da moi hon.

Output nam tai:

```text
public/videos/pingpong/slide_01.mp4
public/videos/pingpong/slide_02.mp4
...
public/videos/pingpong/slide_24.mp4
```

Sau khi tao video, chay:

```bash
npm run build
```

Vite se copy video vao `dist/videos/pingpong` de dung cho production va mo truc tiep `index.html`.

## Thay video cua mot slide

1. Thay file nguon trong `videotonghop`, giu ten co so slide dung.
2. Chay:

```bash
npm run build:videos
npm run build
```

Vi du thay video slide 12 thi ten file moi can co so `12` trong ten file. Output se la `public/videos/pingpong/slide_12.mp4`.

## Anh nen fallback

Folder `nen` van la nguon anh nen fallback. Anh nen duoc copy sang:

```text
backgrounds/
public/backgrounds/
```

Khi video chua load hoac load loi, slide van hien anh nen tuong ung, khong hien nen den.

## Cau truc chinh

```text
src/data/slides.ts                  Noi dung 24 slide va map anh/video
src/data/videos.ts                  Duong dan video ping-pong va timing dieu huong
src/data/slideLayout.ts             Toa do layout 960 x 540
src/components/BackgroundMedia.tsx  Anh fallback + video nen muted/loop
src/components/Slide.tsx            Render slide, text, icon, takeaway, animation
src/styles.css                      CSS stage, video, text, icon, takeaway
scripts/build-pingpong-videos.mjs   Tao 24 video ping-pong bang FFmpeg
public/videos/pingpong/             24 video ping-pong dau ra
```

## Dieu huong

Website giu dieu huong an:

- Mui ten trai/phai/len/xuong.
- Space, Page Up, Page Down.
- Wheel chuot.
- Vuot doc tren man cam ung.
- Browser Back/Forward qua hash URL.

Khong co thanh dieu khien, khong co page count, khong co nut video controls tren slide.
