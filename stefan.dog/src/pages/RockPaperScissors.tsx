import React, { useRef, useEffect } from 'react';
import '../styles/gameStyle.css';

type PictureType = 'rock' | 'paper' | 'scissors';

interface Picture {
    element: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: PictureType;
}

const RockPaperScissors: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const speedRef = useRef<HTMLInputElement>(null);
    const itemsRef = useRef<HTMLInputElement>(null);
    const startRef = useRef<HTMLButtonElement>(null);

    const pictures: Picture[] = [];

    useEffect(() => {
        const startButton = startRef.current;
        if (startButton) {
            startButton.addEventListener('click', resetSimulation);
        }

        return () => {
            if (startButton) {
                startButton.removeEventListener('click', resetSimulation);
            }
        };
    }, []);

    const createPictures = (count: number, type: PictureType, src: string) => {
        const grid = gridRef.current;
        if (!grid) return;

        for (let i = 0; i < count; i++) {
            const img = new Image();
            img.src = src;
            img.className = 'picture';
            img.style.width = '20px';
            img.style.height = '20px';
            img.style.position = 'absolute';
            grid.appendChild(img);

            pictures.push({
                element: img,
                x: Math.random() * (grid.offsetWidth - 30),
                y: Math.random() * (grid.offsetHeight - 30),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                type
            });
        }
    };

    const resetSimulation = () => {
        const grid = gridRef.current;
        if (!grid || !speedRef.current || !itemsRef.current || !startRef.current) return;

        startRef.current.disabled = true;
        pictures.length = 0;
        grid.innerHTML = '';

        const count = parseInt(itemsRef.current.value, 10);

        createPictures(count, 'rock', 'source/rock.png');
        createPictures(count, 'paper', 'source/paper.png');
        createPictures(count, 'scissors', 'source/scissors.png');

        update();
    };

    const update = () => {
        const speed = parseFloat(speedRef.current?.value || '1');
        pictures.forEach(p => movePicture(p, speed));

        for (let i = 0; i < pictures.length; i++) {
            for (let j = i + 1; j < pictures.length; j++) {
                if (checkCollision(pictures[i], pictures[j])) {
                    handleCollision(pictures[i], pictures[j]);
                }
            }
        }

        if (checkAllSame()) {
            startRef.current!.disabled = false;
        } else {
            requestAnimationFrame(update);
        }
    };

    const checkCollision = (a: Picture, b: Picture): boolean => {
        const r1 = a.element.getBoundingClientRect();
        const r2 = b.element.getBoundingClientRect();
        return !(
            r1.top > r2.bottom ||
            r1.bottom < r2.top ||
            r1.left > r2.right ||
            r1.right < r2.left
        );
    };

    const handleCollision = (a: Picture, b: Picture) => {
        const combo = `${a.type}-${b.type}`;
        const setType = (type: PictureType, src: string) => {
            a.type = b.type = type;
            a.element.src = b.element.src = src;
        };

        if (combo.includes('rock') && combo.includes('paper')) setType('paper', 'source/paper.png');
        if (combo.includes('scissors') && combo.includes('paper')) setType('scissors', 'source/scissors.png');
        if (combo.includes('rock') && combo.includes('scissors')) setType('rock', 'source/rock.png');
    };

    const checkAllSame = () => {
        return pictures.every(p => p.type === pictures[0].type);
    };

    const movePicture = (p: Picture, speed: number) => {
        const targetType: PictureType =
            p.type === 'rock' ? 'scissors' : p.type === 'scissors' ? 'paper' : 'rock';

        const target = pictures.find(t => t.type === targetType);
        if (target) {
            const angle = Math.atan2(target.y - p.y, target.x - p.x);
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
        }

        p.x += p.vx;
        p.y += p.vy;

        const grid = gridRef.current!;
        const w = grid.offsetWidth - p.element.offsetWidth;
        const h = grid.offsetHeight - p.element.offsetHeight;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;
    };

    return (
        <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <div ref={gridRef} id="grid" />
            <div id="controls">
                <button ref={startRef} id="startButton">Start Game</button>
                <div>
                    <label htmlFor="speed">Speed:</label>
                    <input ref={speedRef} id="speed" type="number" defaultValue={1} />
                </div>
                <div>
                    <label htmlFor="items">Team Size:</label>
                    <input ref={itemsRef} id="items" type="number" defaultValue={5} />
                </div>
            </div>
        </div>
    );
};

export default RockPaperScissors;
