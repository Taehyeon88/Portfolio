"use strict";

// portfolio.js가 #app을 렌더링한 뒤, 히어로 아래에 AI 활용 안내 띠를 덧붙이는 확장 스크립트.
// 실패해도 기존 화면에는 영향이 없도록 모든 동작을 try/catch로 감싼다.
(function () {
  const STRIP_HTML = `
    <section class="ai-strip-wrap" aria-label="AI 활용">
      <a class="ai-strip" href="ai-workflow.html">
        <span class="ai-strip-tag">AI WORKFLOW</span>
        <span class="ai-strip-text"><strong>AI 활용 방식 보기</strong><span>졸업작품에서 실제로 운영 중인 Claude Code 개발 워크플로우</span></span>
        <span class="ai-strip-go">자세히 보기 →</span>
      </a>
    </section>`;

  function insertStrip(app) {
    const hero = app.querySelector(".hero");
    if (!hero || app.querySelector(".ai-strip-wrap")) return false;
    hero.insertAdjacentHTML("afterend", STRIP_HTML);
    return true;
  }

  try {
    const app = document.getElementById("app");
    if (!app || insertStrip(app)) return;
    const observer = new MutationObserver(() => {
      try { if (insertStrip(app)) observer.disconnect(); }
      catch (error) { observer.disconnect(); console.error(error); }
    });
    observer.observe(app, { childList: true });
  } catch (error) {
    console.error(error);
  }
})();
