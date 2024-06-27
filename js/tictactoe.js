// TODO:
// 1. Leaderboard
// 2. More settings
// 3. Better styling
// 4. Include navbar
// 5. Find better pictures for items

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const speedInput = document.getElementById('speed');
    const itemsCountInput = document.getElementById('items');
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', resetSimulation);

    const pictures = [];

    function createPictures(pictureCount, pictureType, pictureSrc) {
        for (let i = 0; i < pictureCount; i++) {
            const img = document.createElement('img');
            img.src = pictureSrc;
            img.classList.add('picture');
            img.style = "width: 20px; height: 20px; position: absolute"
            grid.appendChild(img);
            pictures.push({
                element: img,
                x: Math.random() * (grid.offsetWidth - img.offsetWidth - 10),
                y: Math.random() * (grid.offsetHeight - img.offsetHeight - 10),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                type: pictureType
            });
        }
    }

    

    function resetSimulation() {
        startButton.disabled = true;
        pictures.length = 0;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        createPictures(parseFloat(itemsCountInput.value), 'rock', 'source/rock.png');
        createPictures(parseFloat(itemsCountInput.value), 'paper', 'source/paper.png');
        createPictures(parseFloat(itemsCountInput.value), 'scissors', 'source/scissors.png');
        update();
    }

    

    function findNearestTarget(picture, targetType) {
        let nearestTarget = null;
        let minDistance = Infinity;
        pictures.forEach(target => {
            if (target.type === targetType) {
                const distance = Math.hypot(picture.x - target.x, picture.y - target.y);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestTarget = target;
                }
            }
        });
        return nearestTarget;
    }

    function movePicture(picture, speed) {
        const targetType = picture.type === 'rock' ? 'scissors' : picture.type === 'scissors' ? 'paper' : 'rock';
        const target = findNearestTarget(picture, targetType);

        if (target) {
            const angle = Math.atan2(target.y - picture.y, target.x - picture.x);
            picture.vx = Math.cos(angle) * speed;
            picture.vy = Math.sin(angle) * speed;
        }

        picture.x += picture.vx;
        picture.y += picture.vy;

        if (picture.x < 0 || picture.x > (grid.offsetWidth - picture.element.offsetWidth)) picture.vx *= -1;
        if (picture.y < 0 || picture.y > (grid.offsetWidth - picture.element.offsetWidth)) picture.vy *= -1;

        picture.element.style.left = `${picture.x}px`;
        picture.element.style.top = `${picture.y}px`;
    }

    function checkCollision(picture1, picture2) {
        const rect1 = picture1.element.getBoundingClientRect();
        const rect2 = picture2.element.getBoundingClientRect();

        return !(
            rect1.top > rect2.bottom ||
            rect1.bottom < rect2.top ||
            rect1.left > rect2.right ||
            rect1.right < rect2.left
        );
    }

    function handleCollision(picture1, picture2) {
        if ((picture1.type === 'rock' && picture2.type === 'paper') || (picture2.type === 'rock' && picture1.type === 'paper')) {
            picture1.element.src = picture2.element.src = 'source/paper.png';
            picture1.type = picture2.type = 'paper';
        } else if ((picture1.type === 'scissors' && picture2.type === 'paper') || (picture2.type === 'scissors' && picture1.type === 'paper')) {
            picture1.element.src = picture2.element.src = 'source/scissors.png';
            picture1.type = picture2.type = 'scissors';
        } else if ((picture1.type === 'scissors' && picture2.type === 'rock') || (picture2.type === 'scissors' && picture1.type === 'rock')) {
            picture1.element.src = picture2.element.src = 'source/rock.png';
            picture1.type = picture2.type = 'rock';
        }
    }

    function checkAllPicturesSame() {
        return pictures.every(p => p.type === pictures[0].type);
    }

    function update() {
        const speed = parseFloat(speedInput.value);
        pictures.forEach(picture => movePicture(picture, speed));

        for (let i = 0; i < pictures.length; i++) {
            for (let j = i + 1; j < pictures.length; j++) {
                if (checkCollision(pictures[i], pictures[j])) {
                    handleCollision(pictures[i], pictures[j]);
                }
            }
        }

        if (checkAllPicturesSame()) {
            startButton.disabled = false;
        } else {
            requestAnimationFrame(update);
        }
    }
});