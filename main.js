const inputsDiv = document.getElementById('inputs');
const theoremSelect = document.getElementById('theorem');
const svg = document.getElementById('circle-svg');
const calcBtn = document.getElementById('calc-btn');

function clamp(val, min, max) {
    if (isNaN(val)) return min;
    return Math.max(min, Math.min(max, val));
}

function toRadians(deg) {
    return deg * Math.PI / 180;
}

function drawCentral(angleCircum) {
    const cx = 150, cy = 150, r = 100;
    angleCircum = clamp(angleCircum, 1, 180);
    const angleC = angleCircum * 2;
    // Calculate arc endpoints
    const p1 = {
        x: cx + r * Math.cos(toRadians(0)),
        y: cy + r * Math.sin(toRadians(0))
    };
    const p2 = {
        x: cx + r * Math.cos(toRadians(angleC)),
        y: cy + r * Math.sin(toRadians(angleC))
    };
    // Place 2θ label inside the center angle
    const label2thetaX = cx + 45 * Math.cos(toRadians(angleC / 2));
    const label2thetaY = cy + 45 * Math.sin(toRadians(angleC / 2));
    // Place θ label inside the circumference angle
    const circX = cx + r * Math.cos(toRadians(angleC / 2));
    const circY = cy + r * Math.sin(toRadians(angleC / 2));
    const labelThetaX = circX + 32 * Math.cos(toRadians(angleC / 2 + 90));
    const labelThetaY = circY + 32 * Math.sin(toRadians(angleC / 2 + 90));
    svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${p1.x}" y2="${p1.y}" stroke="#d77" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${p2.x}" y2="${p2.y}" stroke="#d77" stroke-width="2"/>
        <path d="M${p1.x} ${p1.y}
                 A${r} ${r} 0 0 1 ${p2.x} ${p2.y}"
              fill="none" stroke="#aaa" stroke-width="1"/>
        <text x="${cx + 30}" y="${cy - 10}" font-size="16" fill="#0078d7">O</text>
        <text x="${label2thetaX}" y="${label2thetaY}" font-size="15" fill="#d77" text-anchor="middle" alignment-baseline="middle">${angleC}°</text>
        <text x="${labelThetaX}" y="${labelThetaY}" font-size="15" fill="#2a7" text-anchor="middle" alignment-baseline="middle">${angleCircum}°</text>
    `;
}

function drawCircumference(angleCentral) {
    const cx = 150, cy = 150, r = 100;
    angleCentral = clamp(angleCentral, 1, 360);
    const angleC = angleCentral;
    const angleCircum = angleCentral / 2;

    // Endpoints of the arc at angle 0 and angleC
    const p1 = {
        x: cx + r * Math.cos(toRadians(0)),
        y: cy + r * Math.sin(toRadians(0))
    };
    const p2 = {
        x: cx + r * Math.cos(toRadians(angleC)),
        y: cy + r * Math.sin(toRadians(angleC))
    };

    // Point at circumference for the angle at the circumference (placed at the midpoint of the arc)
    const midAngle = angleC / 2;
    const px = cx + r * Math.cos(toRadians(midAngle));
    const py = cy + r * Math.sin(toRadians(midAngle));

    // θ label inside circumference angle (move toward center)
    const labelThetaX = (2 * px + cx) / 3;
    const labelThetaY = (2 * py + cy) / 3;
    // 2θ label inside center angle
    const label2thetaX = cx + 45 * Math.cos(toRadians(angleC / 2));
    const label2thetaY = cy + 45 * Math.sin(toRadians(angleC / 2));
    svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${p1.x}" y2="${p1.y}" stroke="#d77" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${p2.x}" y2="${p2.y}" stroke="#d77" stroke-width="2"/>
        <line x1="${p1.x}" y1="${p1.y}" x2="${px}" y2="${py}" stroke="#2a7" stroke-width="2"/>
        <line x1="${p2.x}" y1="${p2.y}" x2="${px}" y2="${py}" stroke="#2a7" stroke-width="2"/>
        <text x="${cx + 30}" y="${cy - 10}" font-size="16" fill="#0078d7">O</text>
        <text x="${labelThetaX}" y="${labelThetaY}" font-size="15" fill="#2a7" text-anchor="middle" alignment-baseline="middle">${angleCircum}°</text>
        <text x="${label2thetaX}" y="${label2thetaY}" font-size="15" fill="#d77" text-anchor="middle" alignment-baseline="middle">${angleCentral}°</text>
    `;
}

function drawSegment(angleA) {
    const cx = 150, cy = 150, r = 100;
    angleA = clamp(angleA, 1, 180);

    // Place two points on the circle for the chord
    // We'll use angleA as the value for both angles at the circumference
    // Place A at 210°, B at -30°, C at 120°, D at 60°
    const angleA1 = 210;
    const angleB1 = -30;
    const angleC1 = 120;
    const angleD1 = 60;

    // Chord endpoints
    const pA = {
        x: cx + r * Math.cos(toRadians(angleA1)),
        y: cy + r * Math.sin(toRadians(angleA1))
    };
    const pB = {
        x: cx + r * Math.cos(toRadians(angleB1)),
        y: cy + r * Math.sin(toRadians(angleB1))
    };
    // Two points in the same segment
    const pC = {
        x: cx + r * Math.cos(toRadians(angleC1)),
        y: cy + r * Math.sin(toRadians(angleC1))
    };
    const pD = {
        x: cx + r * Math.cos(toRadians(angleD1)),
        y: cy + r * Math.sin(toRadians(angleD1))
    };

    // θ label inside each angle (move a bit toward the center)
    const labelC = {
        x: (2 * pC.x + cx) / 3,
        y: (2 * pC.y + cy) / 3
    };
    const labelD = {
        x: (2 * pD.x + cx) / 3,
        y: (2 * pD.y + cy) / 3
    };

    svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="2"/>
        <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#d77" stroke-width="2"/>
        <line x1="${pA.x}" y1="${pA.y}" x2="${pC.x}" y2="${pC.y}" stroke="#2a7" stroke-width="2"/>
        <line x1="${pB.x}" y1="${pB.y}" x2="${pC.x}" y2="${pC.y}" stroke="#2a7" stroke-width="2"/>
        <line x1="${pA.x}" y1="${pA.y}" x2="${pD.x}" y2="${pD.y}" stroke="#2a7" stroke-width="2"/>
        <line x1="${pB.x}" y1="${pB.y}" x2="${pD.x}" y2="${pD.y}" stroke="#2a7" stroke-width="2"/>
        <circle cx="${pA.x}" cy="${pA.y}" r="6" fill="#0078d7"/>
        <circle cx="${pB.x}" cy="${pB.y}" r="6" fill="#0078d7"/>
        <circle cx="${pC.x}" cy="${pC.y}" r="6" fill="#0078d7"/>
        <circle cx="${pD.x}" cy="${pD.y}" r="6" fill="#0078d7"/>
        <text x="${pA.x - 18}" y="${pA.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">A</text>
        <text x="${pB.x + 10}" y="${pB.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">B</text>
        <text x="${pC.x - 10}" y="${pC.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">C</text>
        <text x="${pD.x + 10}" y="${pD.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">D</text>
        <text x="${labelC.x}" y="${labelC.y}" font-size="15" fill="#2a7" text-anchor="middle" alignment-baseline="middle">${angleA}°</text>
        <text x="${labelD.x}" y="${labelD.y}" font-size="15" fill="#2a7" text-anchor="middle" alignment-baseline="middle">${angleA}°</text>
    `;
}

function drawTangent() {
    const cx = 150, cy = 150, r = 100;
    // Tangent point (rightmost point of the circle)
    const tx = cx + r;
    const ty = cy;
    // Tangent line (vertical, passing through tangent point)
    const tangentLength = 60;
    const tangentX1 = tx;
    const tangentY1 = ty - tangentLength / 2;
    const tangentX2 = tx;
    const tangentY2 = ty + tangentLength / 2;
    // Draw right angle symbol at tangent point
    const raSize = 14;
    const raX = tx - raSize;
    const raY = ty - raSize;
    svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" stroke="#d77" stroke-width="2"/>
        <line x1="${tangentX1}" y1="${tangentY1}" x2="${tangentX2}" y2="${tangentY2}" stroke="#2a7" stroke-width="2"/>
        <rect x="${raX}" y="${raY}" width="12" height="12" fill="none" stroke="#d77" stroke-width="2"/>
        <text x="${tx + 22}" y="${ty - 10}" font-size="15" fill="#2a7" font-weight="bold" text-anchor="start" style="paint-order:stroke;stroke:#fff;stroke-width:4px;">Tangent</text>
        <text x="${cx + 30}" y="${cy - 20}" font-size="16" fill="#0078d7">O</text>
        <text x="${cx + r/2}" y="${cy - 18}" font-size="14" fill="#d77">r</text>
        <text x="${tx + 18}" y="${ty + 28}" font-size="14" fill="#d77">90°</text>
    `;
}

function validateInput(id, min, max) {
    const el = document.getElementById(id);
    if (!el) return false;
    const val = parseFloat(el.value);
    if (isNaN(val) || val < min || val > max) {
        el.style.borderColor = 'red';
        return false;
    }
    el.style.borderColor = '';
    return true;
}

function updateButtonState() {
    const t = theoremSelect.value;
    let valid = true;
    if (t === 'central') {
        valid = validateInput('circumAngle', 1, 180);
    } else if (t === 'circumference') {
        valid = validateInput('centralAngle', 1, 360);
    } else if (t === 'segment') {
        valid = validateInput('angleA', 1, 180);
    }
    calcBtn.disabled = !valid;
}

function renderInputs(theorem) {
    let html = '';
    if (theorem === 'central') {
        html = `<label>Angle at circumference (°): <input type="number" id="circumAngle" min="1" max="180" value="30" oninput="updateSVGInputs()"></label>`;
        drawCentral(30);
    } else if (theorem === 'circumference') {
        html = `<label>Angle at center (°): <input type="number" id="centralAngle" min="1" max="360" value="60" oninput="updateSVGInputs()"></label>`;
        drawCircumference(60);
    } else if (theorem === 'segment') {
        html = `<label for="angleA">Angle A (°):</label>
            <input type="number" id="angleA" min="1" max="180" step="any" value="40" oninput="updateSVGInputs()">`;
        drawSegment(40);
    } else if (theorem === 'tangent') {
        html = `<label for="radiusAngle">Angle between tangent and radius (°):</label>
            <input type="number" id="radiusAngle" min="90" max="90" step="any" value="90" disabled>
            <small>This angle is always 90°</small>`;
        drawTangent();
    }
    inputsDiv.innerHTML = html;

    // Eventi robusti per validazione e aggiornamento bottone
    if (theorem === 'central') {
        const el = document.getElementById('circumAngle');
        el.addEventListener('input', e => {
            let v = clamp(Number(e.target.value), 1, 180);
            drawCentral(v);
            updateButtonState();
        });
        el.addEventListener('change', e => {
            let v = clamp(Number(e.target.value), 1, 180);
            drawCentral(v);
            updateButtonState();
        });
    } else if (theorem === 'circumference') {
        const el = document.getElementById('centralAngle');
        el.addEventListener('input', e => {
            let v = clamp(Number(e.target.value), 1, 360);
            drawCircumference(v);
            updateButtonState();
        });
        el.addEventListener('change', e => {
            let v = clamp(Number(e.target.value), 1, 360);
            drawCircumference(v);
            updateButtonState();
        });
    } else if (theorem === 'segment') {
        const el = document.getElementById('angleA');
        el.addEventListener('input', e => {
            let v = clamp(Number(e.target.value), 1, 180);
            drawSegment(v);
            updateButtonState();
        });
        el.addEventListener('change', e => {
            let v = clamp(Number(e.target.value), 1, 180);
            drawSegment(v);
            updateButtonState();
        });
    }
    updateButtonState();
}

theoremSelect.addEventListener('change', function() {
    renderInputs(this.value);
});
renderInputs('central');

function updateSVGInputs() {
    const theorem = theoremSelect.value;
    if (theorem === 'central') {
        const angle = Number(document.getElementById('circumAngle').value);
        drawCentral(angle);
    } else if (theorem === 'circumference') {
        const angle = Number(document.getElementById('centralAngle').value);
        drawCircumference(angle);
    } else if (theorem === 'segment') {
        const angle = Number(document.getElementById('angleA').value);
        drawSegment(angle);
    } else if (theorem === 'tangent') {
        drawTangent();
    }
}

function calcola() {
    const t = theoremSelect.value;
    let result = '';
    if (t === 'central') {
        const el = document.getElementById('circumAngle');
        let angle = clamp(parseFloat(el.value), 1, 180);
        if (isNaN(angle)) { result = 'Enter a valid value.'; }
        else result = `The angle at the center is ${angle * 2}° (double the angle at the circumference).`;
        drawCentral(angle);
    } else if (t === 'circumference') {
        const el = document.getElementById('centralAngle');
        let angle = clamp(parseFloat(el.value), 1, 360);
        if (isNaN(angle)) { result = 'Enter a valid value.'; }
        else result = `The angle at the circumference is ${angle / 2}° (half the angle at the center).`;
        drawCircumference(angle);
    } else if (t === 'segment') {
        const el = document.getElementById('angleA');
        let angle = clamp(parseFloat(el.value), 1, 180);
        if (isNaN(angle)) { result = 'Enter a valid value.'; }
        else result = `All angles in the same segment are ${angle}°.`; 
        drawSegment(angle);
    } else if (t === 'tangent') {
        result = "The angle between tangent and radius is always 90°.";
        drawTangent();
    }
    document.getElementById('result').textContent = result;
}
// --- INTERACTIVE CIRCLE THEOREMS SECTION (DRAGGABLE) ---
const circleTheoremSVG = document.getElementById('theorem-svg');
const circleTheoremSelect = document.getElementById('circle-theorem-select');
const circleTheoremDesc = document.getElementById('theorem-desc');

// State for draggable angles
const initialDragState = {
    angle: -Math.PI / 3,
    angle2: Math.PI / 3
};
let dragState = {
    dragging: false,
    angle: initialDragState.angle,
    angle2: initialDragState.angle2
};

function polarToXY(cx, cy, r, angle) {
    return {
        x: cx + r * Math.cos(angle),
        y: cy - r * Math.sin(angle)
    };
}

function getAngleFromXY(cx, cy, x, y) {
    // atan2(y, x) con y invertito per SVG
    return Math.atan2(cy - y, x - cx);
}

function drawTheoremSVG(type) {
    const cx = 160, cy = 160, r = 110;
    let svg = '', desc = '';
    if (type === 'center') {
        // Draggable angle at center
        let a1 = dragState.angle;
        let a2 = dragState.angle2;
        if (a1 > a2 - 0.35) a1 = a2 - 0.35;
        if (a2 < a1 + 0.35) a2 = a1 + 0.35;
        if (a1 < -Math.PI) a1 = -Math.PI;
        if (a2 > Math.PI) a2 = Math.PI;
        dragState.angle = a1;
        dragState.angle2 = a2;
        const p1 = polarToXY(cx, cy, r, a1);
        const p2 = polarToXY(cx, cy, r, a2);
        // Calcola anche l'angolo alla circonferenza
        const angleAtCenter = Math.abs(a2 - a1) * 180 / Math.PI;
        const angleAtCirc = angleAtCenter / 2;
        // Punto sulla circonferenza per l'angolo alla circonferenza
        const circAngle = (a1 + a2) / 2;
        const circP = polarToXY(cx, cy, r, circAngle);
        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <line x1="${cx}" y1="${cy}" x2="${p1.x}" y2="${p1.y}" stroke="#d77" stroke-width="3"/>
            <line x1="${cx}" y1="${cy}" x2="${p2.x}" y2="${p2.y}" stroke="#d77" stroke-width="3"/>
            <path d="M${p1.x} ${p1.y}
                     A${r} ${r} 0 ${(Math.abs(a2-a1) > Math.PI ? 1 : 0)} 0 ${p2.x} ${p2.y}"
                  fill="none" stroke="#aaa" stroke-width="1.5"/>
            <circle cx="${p1.x}" cy="${p1.y}" r="9" fill="#fff" stroke="#d77" stroke-width="2" style="cursor:pointer"/>
            <circle cx="${p2.x}" cy="${p2.y}" r="9" fill="#fff" stroke="#d77" stroke-width="2" style="cursor:pointer"/>
            <text x="${cx + 40}" y="${cy - 10}" font-size="18" fill="#0078d7">O</text>
            <text x="${cx + 80}" y="${cy - 60}" font-size="16" fill="#d77" font-weight="bold">${Math.round(angleAtCenter)}°</text>
            <line x1="${p1.x}" y1="${p1.y}" x2="${circP.x}" y2="${circP.y}" stroke="#2a7" stroke-width="2"/>
            <line x1="${p2.x}" y1="${p2.y}" x2="${circP.x}" y2="${circP.y}" stroke="#2a7" stroke-width="2"/>
            <circle cx="${circP.x}" cy="${circP.y}" r="7" fill="#2a7"/>
            <text x="${circP.x + 10}" y="${circP.y - 10}" font-size="15" fill="#2a7" font-weight="bold">${Math.round(angleAtCirc)}°</text>
        `;
        desc = `<b>Central angle theorem:</b> The angle at the center (red) is twice the angle at the circumference (green) subtended by the same arc.<br>
        <ul>
            <li>Drag the red points to change the arc width.</li>
            <li>The center angle &theta;<sub>c</sub> = 2 &times; &theta;<sub>circ</sub></li>
        </ul>`;
    } else if (type === 'semicircle') {
        // Draggable angle in semicircle
        // C deve stare sulla semicirconferenza superiore (y < cy)
        let a = dragState.angle;
        const cx = 160, cy = 160, r = 110;
        // Forza C a stare nella semicirconferenza superiore (da -PI a 0)
        if (a > 0) a = 0;
        if (a < -Math.PI) a = -Math.PI;
        // Evita che C sia troppo vicino agli estremi (A o B)
        const minDelta = 0.45;
        if (a > -minDelta) a = -minDelta;
        if (a < -Math.PI + minDelta) a = -Math.PI + minDelta;
        dragState.angle = a;
        const A = polarToXY(cx, cy, r, Math.PI);
        const B = polarToXY(cx, cy, r, 0);
        const C = polarToXY(cx, cy, r, a);
        const labelX = C.x + (cx - C.x) * 0.18;
        const labelY = C.y + (cy - C.y) * 0.18;
        const orthoLen = 16;
        const vx = (A.x - C.x) / r, vy = (A.y - C.y) / r;
        const wx = (B.x - C.x) / r, wy = (B.y - C.y) / r;
        const px1 = C.x + vx * orthoLen;
        const py1 = C.y + vy * orthoLen;
        const px2 = px1 + wx * orthoLen * 0.7;
        const py2 = py1 + wy * orthoLen * 0.7;
        const px3 = C.x + wx * orthoLen;
        const py3 = C.y + wy * orthoLen;
        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#0078d7" stroke-width="3"/>
            <circle cx="${A.x}" cy="${A.y}" r="5" fill="#0078d7"/>
            <circle cx="${B.x}" cy="${B.y}" r="5" fill="#0078d7"/>
            <circle cx="${C.x}" cy="${C.y}" r="10" fill="#fff" stroke="#d77" stroke-width="2" style="cursor:pointer"/>
            <line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#2a7" stroke-width="3"/>
            <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#2a7" stroke-width="3"/>
            <text x="${A.x - 18}" y="${A.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">A</text>
            <text x="${B.x + 8}" y="${B.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">B</text>
            <text x="${C.x - 10}" y="${C.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">C</text>
            <text x="${labelX}" y="${labelY}" font-size="16" fill="#d77" font-weight="bold" text-anchor="middle" alignment-baseline="middle">90°</text>
            <polyline points="${C.x},${C.y} ${px1},${py1} ${px2},${py2} ${px3},${py3}" fill="none" stroke="#d77" stroke-width="2"/>
        `;
        desc = `<b>Angle in a semicircle:</b> The angle inscribed in a semicircle is always a right angle (90°).<br>
        <ul>
            <li>Drag the red point on the upper semicircle.</li>
            <li>The triangle ABC is always right-angled at C.</li>
        </ul>`;
    } else if (type === 'segment') {
        // Draggable angles in the same segment
        let a = dragState.angle;
        let b = dragState.angle2;
        if (Math.abs(a - b) < 0.35) b = a + 0.35;
        if (a < -Math.PI) a = -Math.PI;
        if (a > Math.PI) a = Math.PI;
        if (b < -Math.PI) b = -Math.PI;
        if (b > Math.PI) b = Math.PI;
        dragState.angle = a;
        dragState.angle2 = b;
        const A = polarToXY(cx, cy, r, a);
        const B = polarToXY(cx, cy, r, b);
        const C = polarToXY(cx, cy, r, Math.PI/2);
        const D = polarToXY(cx, cy, r, -Math.PI/2);
        const theta = Math.abs(Math.round((b-a)*180/Math.PI));
        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#d77" stroke-width="3"/>
            <line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#2a7" stroke-width="3"/>
            <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#2a7" stroke-width="3"/>
            <line x1="${A.x}" y1="${A.y}" x2="${D.x}" y2="${D.y}" stroke="#2a7" stroke-width="3"/>
            <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#2a7" stroke-width="3"/>
            <circle cx="${A.x}" cy="${A.y}" r="9" fill="#fff" stroke="#d77" stroke-width="2" style="cursor:pointer"/>
            <circle cx="${B.x}" cy="${B.y}" r="9" fill="#fff" stroke="#d77" stroke-width="2" style="cursor:pointer"/>
            <circle cx="${C.x}" cy="${C.y}" r="5" fill="#0078d7"/>
            <circle cx="${D.x}" cy="${D.y}" r="5" fill="#0078d7"/>
            <text x="${A.x - 18}" y="${A.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">A</text>
            <text x="${B.x + 8}" y="${B.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">B</text>
            <text x="${C.x - 20}" y="${C.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">C</text>
            <text x="${D.x + 10}" y="${D.y + 10}" font-size="16" fill="#0078d7" font-weight="bold">D</text>
            <text x="${C.x - 10}" y="${C.y + 20}" font-size="16" fill="#d77" font-weight="bold">${theta}°</text>
            <text x="${D.x + 10}" y="${D.y - 10}" font-size="16" fill="#d77" font-weight="bold">${theta}°</text>
        `;
        desc = `<b>Angles in the same segment:</b> Angles at the circumference subtended by the same arc are equal.<br>
        <ul>
            <li>Drag the red points to change the position of the angles.</li>
            <li>The highlighted angles are always congruent (&theta;).</li>
        </ul>`;
    } else if (type === 'cyclic') {
        // Cyclic quadrilateral
        // Vertici A, B, C, D in senso orario, distribuiti in modo più naturale
        const angles = [
            Math.PI * 0.8,   // A
            Math.PI * 0.35,  // B
            -Math.PI * 0.15, // C
            -Math.PI * 0.7   // D
        ];
        const A = polarToXY(cx, cy, r, angles[0]);
        const B = polarToXY(cx, cy, r, angles[1]);
        const C = polarToXY(cx, cy, r, angles[2]);
        const D = polarToXY(cx, cy, r, angles[3]);

        // Calcolo angoli interni (in gradi), sempre minori di 180
        function angleAt(P, Q, R) {
            // angolo in Q tra P-Q e R-Q
            const v1x = P.x - Q.x, v1y = P.y - Q.y;
            const v2x = R.x - Q.x, v2y = R.y - Q.y;
            const dot = v1x * v2x + v1y * v2y;
            const det = v1x * v2y - v1y * v2x;
            let ang = Math.atan2(det, dot) * 180 / Math.PI;
            if (ang < 0) ang += 360;
            if (ang > 180) ang = 360 - ang;
            return ang;
        }
        // Calcola e arrotonda
        // Calcola solo due angoli, gli altri sono 180 - opposto
        const angleA = Math.round(angleAt(D, A, B));
        const angleB = Math.round(angleAt(A, B, C));
        const angleC = 180 - angleA;
        const angleD = 180 - angleB;

        // Offset per le label degli angoli per evitare sovrapposizioni
        function offset(x, y, dx, dy) {
            return { x: x + dx, y: y + dy };
        }
        const labelA = offset(A.x, A.y, -38, 10);
        const labelB = offset(B.x, B.y, 28, 18);
        const labelC = offset(C.x, C.y, 18, -28);
        const labelD = offset(D.x, D.y, -44, -18);

        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" fill="none" stroke="#d77" stroke-width="3"/>
            <circle cx="${A.x}" cy="${A.y}" r="7" fill="#fff" stroke="#0078d7" stroke-width="2"/>
            <circle cx="${B.x}" cy="${B.y}" r="7" fill="#fff" stroke="#0078d7" stroke-width="2"/>
            <circle cx="${C.x}" cy="${C.y}" r="7" fill="#fff" stroke="#0078d7" stroke-width="2"/>
            <circle cx="${D.x}" cy="${D.y}" r="7" fill="#fff" stroke="#0078d7" stroke-width="2"/>
            <text x="${A.x - 18}" y="${A.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">A</text>
            <text x="${B.x + 10}" y="${B.y + 18}" font-size="16" fill="#0078d7" font-weight="bold">B</text>
            <text x="${C.x + 10}" y="${C.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">C</text>
            <text x="${D.x - 28}" y="${D.y - 10}" font-size="16" fill="#0078d7" font-weight="bold">D</text>
            <text x="${labelA.x}" y="${labelA.y}" font-size="16" fill="#d77" font-weight="bold">${angleA}°</text>
            <text x="${labelB.x}" y="${labelB.y}" font-size="16" fill="#d77" font-weight="bold">${angleB}°</text>
            <text x="${labelC.x}" y="${labelC.y}" font-size="16" fill="#d77" font-weight="bold">${angleC}°</text>
            <text x="${labelD.x}" y="${labelD.y}" font-size="16" fill="#d77" font-weight="bold">${angleD}°</text>
        `;
        desc = `<b>Cyclic quadrilateral:</b> In any quadrilateral inscribed in a circle, the sum of the opposite angles is always 180°.<br>
        <ul>
            <li>ABCD is a cyclic quadrilateral.</li>
            <li>Opposite angles: ${angleA}° + ${angleC}° = 180° &nbsp;&nbsp; ${angleB}° + ${angleD}° = 180°</li>
            <li>x + y = 180°</li>
        </ul>`;
    } else if (type === 'tangent') {
        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#d77" stroke-width="3"/>
            <line x1="${cx + r}" y1="${cy}" x2="${cx + r}" y2="${cy - 70}" stroke="#2a7" stroke-width="3"/>
            <text x="${cx + 30}" y="${cy - 10}" font-size="18" fill="#0078d7">O</text>
            <text x="${cx + r + 10}" y="${cy - 40}" font-size="16" fill="#2a7">Tangent</text>
            <text x="${cx + r/2}" y="${cy - 18}" font-size="16" fill="#d77">r</text>
            <text x="${cx + r + 18}" y="${cy + 28}" font-size="16" fill="#d77">90°</text>
        `;
        desc = `<b>Tangent and radius:</b> The tangent to a circle is always perpendicular to the radius at the point of tangency.<br>
        <ul>
            <li>The radius (red) and the tangent (green) always form a right angle.</li>
        </ul>`;
    } else if (type === 'alternate') {
        svg = `
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eaf6ff" stroke="#0078d7" stroke-width="3"/>
            <line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(Math.PI/4)}" y2="${cy - r * Math.sin(Math.PI/4)}" stroke="#d77" stroke-width="3"/>
            <line x1="${cx + r * Math.cos(Math.PI/4)}" y1="${cy - r * Math.sin(Math.PI/4)}" x2="${cx + r * Math.cos(Math.PI/4)}" y2="${cy + r * Math.sin(Math.PI/4)}" stroke="#2a7" stroke-width="3"/>
            <line x1="${cx + r * Math.cos(Math.PI/4)}" y1="${cy + r * Math.sin(Math.PI/4)}" x2="${cx}" y2="${cy}" stroke="#d77" stroke-width="3"/>
            <text x="${cx + r * Math.cos(Math.PI/4) + 10}" y="${cy - r * Math.sin(Math.PI/4) - 10}" font-size="16" fill="#2a7">Tangent</text>
            <text x="${cx + 30}" y="${cy - 10}" font-size="18" fill="#0078d7">O</text>
            <text x="${cx + r * Math.cos(Math.PI/4) - 10}" y="${cy + 30}" font-size="16" fill="#d77">θ</text>
            <text x="${cx - 30}" y="${cy - 30}" font-size="16" fill="#d77">θ</text>
        `;
        desc = `<b>Alternate segment theorem:</b> The angle between a tangent and a chord through the point of contact is equal to the angle in the alternate segment.<br>
        <ul>
            <li>The tangent (green) and the chord (red) form an angle θ.</li>
            <li>This angle is equal to the opposite angle θ at the circumference.</li>
        </ul>`;
    }
    circleTheoremSVG.innerHTML = svg;
    circleTheoremDesc.innerHTML = desc;
}

// Gestione drag sugli angoli
let dragTarget = null;
circleTheoremSVG.addEventListener('mousedown', startDrag);
circleTheoremSVG.addEventListener('touchstart', startDrag, {passive:false});
window.addEventListener('mousemove', dragMove);
window.addEventListener('touchmove', dragMove, {passive:false});
window.addEventListener('mouseup', endDrag);
window.addEventListener('touchend', endDrag);

function getSVGCoords(evt) {
    const rect = circleTheoremSVG.getBoundingClientRect();
    let x, y;
    if (evt.touches && evt.touches.length) {
        x = evt.touches[0].clientX - rect.left;
        y = evt.touches[0].clientY - rect.top;
    } else {
        x = evt.clientX - rect.left;
        y = evt.clientY - rect.top;
    }
    return {x, y};
}

function startDrag(evt) {
    const pt = getSVGCoords(evt);
    let found = false;
    const type = circleTheoremSelect.value;
    if (type === 'center') {
        const cx = 160, cy = 160, r = 110;
        const a1 = dragState.angle;
        const a2 = dragState.angle2;
        const p1 = polarToXY(cx, cy, r, a1);
        const p2 = polarToXY(cx, cy, r, a2);
        if (Math.hypot(pt.x - p1.x, pt.y - p1.y) < 15) {
            dragTarget = 'angle';
            found = true;
        } else if (Math.hypot(pt.x - p2.x, pt.y - p2.y) < 15) {
            dragTarget = 'angle2';
            found = true;
        }
    } else if (type === 'semicircle') {
        const cx = 160, cy = 160, r = 110;
        const a = dragState.angle;
        const C = polarToXY(cx, cy, r, a);
        if (Math.hypot(pt.x - C.x, pt.y - C.y) < 15) {
            dragTarget = 'angle';
            found = true;
        }
    } else if (type === 'segment') {
        const cx = 160, cy = 160, r = 110;
        const a = dragState.angle;
        const b = dragState.angle2;
        const A = polarToXY(cx, cy, r, a);
        const B = polarToXY(cx, cy, r, b);
        if (Math.hypot(pt.x - A.x, pt.y - A.y) < 15) {
            dragTarget = 'angle';
            found = true;
        } else if (Math.hypot(pt.x - B.x, pt.y - B.y) < 15) {
            dragTarget = 'angle2';
            found = true;
        }
    }
    if (found) {
        dragState.dragging = true;
        evt.preventDefault();
    }
}

function dragMove(evt) {
    if (!dragState.dragging || !dragTarget) return;
    const pt = getSVGCoords(evt);
    const cx = 160, cy = 160;
    let angle = getAngleFromXY(cx, cy, pt.x, pt.y);
    if (dragTarget === 'angle') {
        if (circleTheoremSelect.value === 'center') {
            // Mantieni almeno 30° tra i due raggi
            if (angle > dragState.angle2 - Math.PI/6) angle = dragState.angle2 - Math.PI/6;
            if (angle < -Math.PI) angle = -Math.PI;
            dragState.angle = angle;
        } else if (circleTheoremSelect.value === 'semicircle') {
            if (angle > 0) angle = 0;
            if (angle < -Math.PI) angle = -Math.PI;
            dragState.angle = angle;
        } else if (circleTheoremSelect.value === 'segment') {
            dragState.angle = angle;
        }
    } else if (dragTarget === 'angle2') {
        if (circleTheoremSelect.value === 'center') {
            if (angle < dragState.angle + Math.PI/6) angle = dragState.angle + Math.PI/6;
            if (angle > Math.PI) angle = Math.PI;
            dragState.angle2 = angle;
        } else if (circleTheoremSelect.value === 'segment') {
            dragState.angle2 = angle;
        }
    }
    drawTheoremSVG(circleTheoremSelect.value);
    evt.preventDefault();
}

function endDrag(evt) {
    dragState.dragging = false;
    dragTarget = null;
}

circleTheoremSelect.addEventListener('change', function(e) {
    // Reset angoli su cambio teorema
    if (circleTheoremSelect.value === 'semicircle') {
        dragState.angle = -Math.PI / 3;
        dragState.angle2 = Math.PI / 3;
    } else if (circleTheoremSelect.value === 'center') {
        dragState.angle = -Math.PI / 3;
        dragState.angle2 = Math.PI / 3;
    } else if (circleTheoremSelect.value === 'segment') {
        dragState.angle = -Math.PI / 3;
        dragState.angle2 = Math.PI / 3;
    }
    drawTheoremSVG(circleTheoremSelect.value);
});
drawTheoremSVG(circleTheoremSelect.value);

// --- RESET BUTTON LOGIC ---
const resetBtn = document.getElementById('reset-theorem-btn');
if (resetBtn) {
    resetBtn.onclick = function() {
        // Always reset dragState to initial values for draggable theorems
        dragState.angle = initialDragState.angle;
        dragState.angle2 = initialDragState.angle2;
        drawTheoremSVG(circleTheoremSelect.value);
    };
}