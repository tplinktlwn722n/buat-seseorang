document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const messageText = document.getElementById('message-text');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const replayButton = document.getElementById('replay-button');
    const headerGif = document.getElementById('header-gif');

    let currentStep = 0;
    let noButtonClicks = 0;
    let heartsInterval;

    const noButtonResponses = [
        "Yakin?",
        "Gak boleh!",
        "Pencet 'Iya' dong",
        "Masa enggak...",
        "Coba lagi",
        "Hehe gak bisa",
        "Kamu harus 'Iya'!"
    ];

    const story = [
        {
            text: "Hai Ayu, aku ada sesuatu buat kamu...",
            yesText: "Buka",
            noText: null,
            gif: ""
        },
        {
            text: "Aku denger kamu lagi ngerasa minder ya soal beasiswa?",
            yesText: "Iya nih...",
            noText: "Enggak kok",
            gif: ""
        },
        {
            text: "Padahal kamu tau gak, di mataku kamu itu hebat banget.",
            yesText: "Masa sih?",
            noText: "Biasa aja",
            gif: ""
        },
        {
            text: "Beasiswa itu milih kamu bukan karena 'beruntung', tapi karena kamu 'PANTAS'. Mereka nggak salah pilih.",
            yesText: "Makasih...",
            noText: "Gak tau",
            gif: ""
        },
        {
            text: "Jadi, kamu mau janji satu hal? Kamu bakal terus semangat dan percaya diri?",
            yesText: "Iya, aku janji!",
            noText: "Enggak ah, minder",
            gif: ""
        },
        {
            text: "Nah gitu dong! Semangat terus ya Bintang Hebat! Aku selalu di sini dukung kamu. ❤️",
            yesText: "Makasih banyak!",
            noText: null,
            gif: "ayu.jpg" // Menggunakan gambar lokal
        },
        {
            text: "Semangat terus Ayu Novi Azki Umaira ❤",
            yesText: "😊",
            noText: null,
            gif: ""
        }
    ];

    function showNextCard() {
        container.classList.add('exiting');

        setTimeout(() => {
            currentStep++;
            if (currentStep < story.length) {
                updateScreen();
                container.classList.remove('exiting');
            } else {
                // Cerita Selesai
                container.classList.remove('exiting');
                messageText.innerText = "Selesai deh. Semangat terus ya! 😉";
                yesButton.style.display = 'none';
                noButton.style.display = 'none';
                replayButton.style.display = 'inline-block';
                headerGif.style.display = 'none';
                if (!heartsInterval) {
                    createFallingHearts();
                }
            }
        }, 500); // Waktu harus cocok dengan transisi CSS
    }

    function updateScreen() {
        const currentStory = story[currentStep];

        messageText.innerText = currentStory.text;

        yesButton.style.display = 'inline-block';
        yesButton.innerText = currentStory.yesText;

        if (currentStory.noText) {
            noButton.style.display = 'inline-block';
            noButton.innerText = currentStory.noText;
        } else {
            noButton.style.display = 'none';
        }
        
        if (currentStory.gif) {
            headerGif.src = currentStory.gif;
            headerGif.style.display = 'block';
            if (currentStory.gif === "ayu.jpg" && !heartsInterval) {
                createFallingHearts();
            }
        } else {
            headerGif.style.display = 'none';
        }

        replayButton.style.display = 'none';
        noButtonClicks = 0;
        yesButton.style.transform = 'scale(1)';
    }

    yesButton.addEventListener('click', showNextCard);

    noButton.addEventListener('click', () => {
        if (currentStep === 4) {
            const response = noButtonResponses[noButtonClicks % noButtonResponses.length];
            noButton.innerText = response;
            noButtonClicks++;

            const yesButtonSize = 1 + (noButtonClicks * 0.2);
            yesButton.style.transform = `scale(${yesButtonSize})`;
        } else {
            showNextCard(); // Tetap lanjut ke kartu berikutnya
        }
    });

    replayButton.addEventListener('click', () => {
        container.classList.remove('exiting');
        currentStep = 0;
        stopFallingHearts();
        updateScreen();
    });
    
    function createFallingHearts() {
        heartsInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 8 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 300);
    }

    function stopFallingHearts() {
        clearInterval(heartsInterval);
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => heart.remove());
    }

    updateScreen();
});
