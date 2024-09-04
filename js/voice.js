let utterance;
    let clickTimer;
    
    function handleSpeakerClick(textId, icon) {
        clearTimeout(clickTimer); 
    
        if (icon.dataset.playing === 'true') {
            stopSpeech();
            icon.dataset.playing = 'false'; 
            return;
        }
    
        clickTimer = setTimeout(() => {
            if (!utterance || !window.speechSynthesis.speaking) {
                speakText(textId);
                icon.dataset.playing = 'true'; 
            }
        }, 250); 
    }
    
    function speakText(textId) {
        const textElement = document.getElementById(textId);
        const text = textElement.innerText;
        
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    
        utterance.onend = () => {
            resetIcons();
        };
    }
    
    function stopSpeech() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            resetIcons();
        }
    }
    
    function resetIcons() {
        document.querySelectorAll('.speakerIcon').forEach(icon => {
            icon.dataset.playing = 'false';
        });
    }