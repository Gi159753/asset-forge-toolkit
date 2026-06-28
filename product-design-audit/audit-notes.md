# ASSET-FORGE-TOOLKIT Product Audit

Date: 2026-06-28

## Scope

Reviewed the static frontend project at `/Users/lanjian/Documents/Games/Tools`.

Focus:
- First-run clarity for beginner game developers.
- Tool switching and empty states.
- Basic accessibility and responsive risks.
- Minimal product/design improvements, not implementation changes.

Evidence:
- Source files: `index.html`, `styles.css`, `README.md`, `js/app.js`, `js/video-sprite.js`.
- Browser DOM snapshots from `http://127.0.0.1:8765/index.html`.

Limit:
- In-app Browser screenshot capture returned blank images, so visual findings are based on DOM structure and source inspection rather than accepted screenshots.
- No media/image fixture was uploaded, so processing quality, export correctness, and large-file performance were not audited.
- No regression testing was performed.

## Steps Reviewed

1. Cutout tool initial state
   - Health: good functional foundation.
   - The user can see the import drop zone, select-image action, disabled export button, mode choices, parameters, and two preview panes.
   - Main risk: many tuning parameters are visible before the user has imported anything.

2. Video to spritesheet initial state
   - Health: clear but slightly developer-heavy.
   - Import, generation, progress, and download areas are separated well.
   - Main risk: labels like `frame_count`, `columns`, `fps`, and JSON metadata are useful for developers but can feel like config fields before the user understands the workflow.

3. Pixel style converter initial state
   - Health: powerful but dense.
   - Preset and algorithm controls are useful, and advanced parameters are partly hidden.
   - Main risk: the first screen still exposes many technical controls and mixed Chinese/English terminology, which raises the learning cost.

4. Mobile/narrow layout from CSS
   - Health: usable in principle, likely awkward in practice.
   - The layout collapses to one column below 900px.
   - Main risk: `.stage` uses a fixed `height: 900px`, which can create excessive scrolling and awkward empty preview space on mobile.

## Recommendations

1. Make each tool start with a simpler "import first" state.
   - Keep the drop zone and primary import button prominent.
   - Collapse secondary parameters until an asset is loaded, or group them under "参数调整".
   - This is the highest-impact UX change and does not require algorithm changes.

2. Normalize terminology.
   - Prefer beginner-facing Chinese labels first: "阈值", "羽化", "去边", "透明强度".
   - Keep English/internal names in smaller helper text only when necessary.
   - The README already uses beginner-friendly language; the UI should match it.

3. Add explicit status and next-step text around disabled buttons.
   - Disabled buttons currently show state but not reason.
   - Add nearby text such as "导入图片后可导出 PNG" or "导入视频后可抽帧".

4. Improve tab accessibility.
   - The three tool buttons visually behave like tabs.
   - Add `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-controls`, or keep them as plain buttons but expose the active state through `aria-pressed`.

5. Replace hover-only explanations with visible or focusable help.
   - Many explanations live in `title` attributes.
   - `title` is weak on touch devices and inconsistent for keyboard/screen-reader users.
   - Use short helper text for essential guidance and reserve detailed explanations for a small help disclosure.

6. Rework mobile preview sizing.
   - Avoid fixed `.stage { height: 900px; }`.
   - Use viewport-relative or content-aware sizing so the preview area does not dominate the mobile flow before import.

7. Add a small sample/demo path.
   - A built-in tiny sample image/video would let first-time users understand the result without preparing files first.
   - If avoiding bundled assets is preferred, add a "示例参数推荐" text block instead.

8. Keep the static architecture.
   - The no-build, no-upload model is a strong fit for this tool.
   - I would avoid introducing a framework unless the UI grows into many more tools or shared component states become hard to manage.
