(() => {
    const TIMEOUT = 120000; // 2 minuten
    const REDIRECT_URL = "/showcases/";

    let timer;

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, TIMEOUT);
    }

    ["mousemove", "mousedown", "keydown", "touchstart", "wheel"].forEach(e =>
        document.addEventListener(e, resetTimer, true)
    );

    resetTimer();
})();
