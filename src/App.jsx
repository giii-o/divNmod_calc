import React, { useEffect, useState } from 'react';
import { evaluateDivMod } from '../lib/divMod.js';

const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'div', '0', 'mod'];

function WindowChrome({ title, status }) {
  return (
    <div className="window-chrome">
      <div className="window-controls" aria-hidden="true">
        <span className="window-control window-control-close" />
        <span className="window-control window-control-minimize" />
        <span className="window-control window-control-maximize" />
      </div>
      <span className="window-title">{title}</span>
      <span className="window-status">
        <span className="status-dot" aria-hidden="true" />
        {status}
      </span>
    </div>
  );
}

function Display({ value }) {
  return (
    <div className="display" aria-live="polite" aria-atomic="true" aria-label="Current expression">
      <span className={value ? '' : 'display-hint'}>{value || 'type an expression...'}</span>
      <span className="display-cursor" aria-hidden="true" />
    </div>
  );
}

function Result({ value, error }) {
  return (
    <div className={`result ${error ? 'result-error' : ''}`} role={error ? 'alert' : 'status'} aria-live="polite">
      <span className="result-label">output</span>
      <output className="result-value" data-testid="result" aria-label="Calculation result">
        {error || value || '—'}
      </output>
    </div>
  );
}

function Keypad({ onKey, onCalculate, onClear }) {
  return (
    <div className="keypad" aria-label="Calculator keypad">
      {keys.map((key) => (
        <button
          className={`key ${key === 'div' || key === 'mod' ? 'key-word' : ''}`}
          key={key}
          type="button"
          onClick={() => onKey(key)}
        >
          {key}
        </button>
      ))}
      <button className="key key-clear" type="button" onClick={onClear}>
        clear
      </button>
      <button className="key key-enter" type="button" onClick={onCalculate} aria-label="Enter">
        <span>run expression</span>
        <span className="enter-arrow" aria-hidden="true">↵</span>
      </button>
    </div>
  );
}

function InputPanel() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  function addKey(key) {
    const isOperator = key === 'div' || key === 'mod';
    const hasResult = result !== '' && !error;

    setExpression((current) => {
      const currentValue = hasResult ? result : current;

      if (isOperator) {
        const trimmedValue = currentValue.trimEnd();

        if (!trimmedValue || /\s(?:div|mod)$/.test(trimmedValue)) {
          return currentValue;
        }

        return `${trimmedValue} ${key} `;
      }

      return `${hasResult ? '' : currentValue}${key}`;
    });
    setResult('');
    setError('');
  }

  function deleteInput() {
    setExpression((current) => {
      const trimmedValue = current.trimEnd();

      if (!trimmedValue) {
        return '';
      }

      if (/\s(?:div|mod)$/.test(trimmedValue)) {
        return trimmedValue.replace(/\s(?:div|mod)$/, '').trimEnd();
      }

      return trimmedValue.slice(0, -1);
    });
    setResult('');
    setError('');
  }

  function clearCalculator() {
    setExpression('');
    setResult('');
    setError('');
  }

  function calculate() {
    try {
      setResult(evaluateDivMod(expression));
      setError('');
    } catch (calculationError) {
      setResult('');
      setError(calculationError instanceof Error ? calculationError.message : 'Unable to calculate this expression.');
    }
  }

  useEffect(() => {
    function handleKeyboardInput(event) {
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }

      if (event.key === 'Enter' && event.target instanceof Element && event.target.closest('button')) {
        return;
      }

      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        addKey(event.key);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteInput();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        clearCalculator();
      }
    }

    window.addEventListener('keydown', handleKeyboardInput);
    return () => window.removeEventListener('keydown', handleKeyboardInput);
  });

  const windowStatus = error ? 'attention' : result ? 'complete' : 'ready';

  return (
    <section className="calculator" aria-label="div and mod input pad">
      <WindowChrome title="div-n-mod.calc" status={windowStatus} />
      <div className="calculator-body">
        <div className="input-meta">
          <span>input stream</span>
          <span>base 10 / integers</span>
        </div>
        <div className="display-row">
          <Display value={expression} />
          <button className="delete-button" type="button" onClick={deleteInput} aria-label="Delete last character">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4h6m-9 3h12l-1 13H7L6 7Zm3 3v7m4-7v7" />
            </svg>
            <span>delete</span>
          </button>
        </div>
        <div className="output-meta">
          <span>calculation result</span>
          <span className="output-rule" aria-hidden="true" />
        </div>
        <Result value={result} error={error} />
        <Keypad onKey={addKey} onCalculate={calculate} onClear={clearCalculator} />
        <div className="shortcut-row">
          <span><kbd>enter</kbd> run</span>
          <span><kbd>esc</kbd> reset</span>
          <span><kbd>⌫</kbd> delete</span>
        </div>
      </div>
    </section>
  );
}

function QuickStartCard() {
  return (
    <aside className="orbit-card guide-card" aria-label="Quick start guide">
      <div className="file-label">
        <span className="folder-icon" aria-hidden="true" />
        quick-start.txt
      </div>
      <h2>Make a move</h2>
      <ol className="guide-list">
        <li><span>01</span> enter a whole number</li>
        <li><span>02</span> choose <strong>div</strong> or <strong>mod</strong></li>
        <li><span>03</span> run the expression</li>
      </ol>
      <span className="paperclip" aria-hidden="true" />
    </aside>
  );
}

function OperatorCard() {
  return (
    <aside className="orbit-card operator-card" aria-label="Operator guide">
      <div className="file-label">
        <span className="mini-badge" aria-hidden="true">∴</span>
        operators.note
      </div>
      <h2>Two tiny tools</h2>
      <dl className="operator-list">
        <div>
          <dt>div</dt>
          <dd>whole quotient</dd>
        </div>
        <div>
          <dt>mod</dt>
          <dd>leftover amount</dd>
        </div>
      </dl>
      <p className="operator-example">20 div 3 <span>→</span> 6</p>
    </aside>
  );
}

function WorkspaceSticker() {
  return (
    <div className="workspace-sticker" aria-hidden="true">
      <span className="sticker-star">✦</span>
      <span>small<br />steps</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        :root {
          color: #111827;
          background: #f3f4f6;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          --canvas: #f3f4f6;
          --paper: #ffffff;
          --paper-soft: #f9fafb;
          --ink: #111827;
          --muted: #6b7280;
          --faint: #9ca3af;
          --line: rgba(17, 24, 39, .13);
          --blue: #2563eb;
          --blue-dark: #1d4ed8;
          --green: #27c93f;
          --red: #ff5f56;
          --yellow: #ffbd2e;
        }
        * { box-sizing: border-box; }
        body { margin: 0; min-width: 320px; min-height: 100vh; background: var(--canvas); }
        button { font: inherit; }
        button:focus-visible { outline: 3px solid rgba(37, 99, 235, .32); outline-offset: 3px; }
        .workspace { position: relative; min-height: 100vh; overflow: hidden; padding: 38px 34px 28px; background-color: var(--canvas); background-image: radial-gradient(rgba(107, 114, 128, .2) 1px, transparent 1px); background-size: 19px 19px; }
        .workspace::before, .workspace::after { content: ''; position: absolute; pointer-events: none; border: 1px solid rgba(107, 114, 128, .14); border-radius: 50%; }
        .workspace::before { width: 600px; height: 600px; top: -370px; left: -250px; box-shadow: 0 0 0 32px var(--canvas), 0 0 0 33px rgba(107, 114, 128, .11), 0 0 0 67px var(--canvas), 0 0 0 68px rgba(107, 114, 128, .1); }
        .workspace::after { width: 730px; height: 730px; right: -375px; bottom: -515px; box-shadow: 0 0 0 32px var(--canvas), 0 0 0 33px rgba(107, 114, 128, .11), 0 0 0 67px var(--canvas), 0 0 0 68px rgba(107, 114, 128, .1); }
        .workspace-header { position: relative; z-index: 5; display: flex; align-items: flex-start; justify-content: space-between; width: min(100%, 1180px); margin: 0 auto; }
        .brand-lockup { display: flex; align-items: center; gap: 13px; }
        .brand-mark { display: grid; width: 43px; height: 43px; place-items: center; border: 1px solid var(--ink); border-radius: 11px; color: var(--paper); background: var(--ink); box-shadow: 4px 4px 0 var(--blue); font-family: Georgia, serif; font-size: 25px; transform: rotate(-4deg); }
        .eyebrow { margin: 0 0 5px; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        h1, h2, p { margin-top: 0; }
        h1 { margin-bottom: 0; color: var(--ink); font-size: clamp(27px, 4vw, 42px); line-height: .96; letter-spacing: -.065em; }
        h1 span { color: var(--blue); }
        .hero-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 9px; padding-top: 3px; }
        .mode-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 11px; border: 1px solid rgba(39, 201, 63, .28); border-radius: 999px; color: #18752a; background: rgba(255, 255, 255, .68); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        .live-dot, .status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 3px rgba(39, 201, 63, .13); }
        .file-caption, .file-stamp { color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
        .file-stamp { color: var(--faint); }
        .workspace-stage { position: relative; z-index: 2; width: min(100%, 1180px); min-height: 640px; margin: 18px auto 0; }
        .workspace-stage::before { content: ''; position: absolute; inset: 40px 9%; border: 1px dashed rgba(107, 114, 128, .18); border-radius: 28px; pointer-events: none; }
        .stage-label { position: absolute; top: 11px; left: 10%; color: var(--faint); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
        .stage-coordinates { position: absolute; right: 10%; bottom: 22px; color: var(--faint); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
        .calculator { position: absolute; z-index: 20; top: 50%; left: 50%; width: min(100%, 478px); overflow: hidden; border: 1px solid rgba(17, 24, 39, .2); border-radius: 12px; background: var(--paper); box-shadow: 0 18px 38px -10px rgba(17, 24, 39, .2), 0 5px 10px -5px rgba(17, 24, 39, .1); transform: translate(-50%, -50%); }
        .window-chrome { display: flex; align-items: center; gap: 11px; min-height: 39px; padding: 0 14px; border-bottom: 1px solid rgba(17, 24, 39, .12); background: #f9fafb; }
        .window-controls { display: flex; gap: 6px; }
        .window-control { display: block; width: 10px; height: 10px; border: 1px solid rgba(17, 24, 39, .12); border-radius: 50%; }
        .window-control-close { border-color: #e44e47; background: var(--red); }
        .window-control-minimize { border-color: #e3a91e; background: var(--yellow); }
        .window-control-maximize { border-color: #20a935; background: var(--green); }
        .window-title, .window-status { color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
        .window-status { display: inline-flex; align-items: center; gap: 7px; margin-left: auto; color: #18752a; text-transform: uppercase; }
        .window-status .status-dot { width: 6px; height: 6px; box-shadow: none; }
        .calculator-body { padding: 22px; }
        .input-meta, .output-meta, .shortcut-row { display: flex; align-items: center; justify-content: space-between; color: var(--faint); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; letter-spacing: .02em; text-transform: uppercase; }
        .input-meta { margin-bottom: 9px; }
        .display-row { display: flex; gap: 10px; align-items: stretch; }
        .display { min-width: 0; min-height: 90px; flex: 1; display: flex; align-items: center; overflow-wrap: anywhere; padding: 18px; border: 1px solid rgba(17, 24, 39, .15); border-radius: 8px; color: var(--ink); background: #eef2ff; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 21px; line-height: 1.45; box-shadow: inset 0 2px 0 rgba(255, 255, 255, .7); }
        .display-hint { color: #9ca3af; font-size: 12px; }
        .display-cursor { width: 2px; height: 23px; margin-left: 4px; flex: 0 0 2px; background: var(--blue); animation: blink 1.2s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .delete-button { width: 66px; flex: 0 0 66px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border: 1px solid rgba(17, 24, 39, .14); border-radius: 8px; color: var(--muted); background: var(--paper); cursor: pointer; font-size: 10px; transition: transform .16s ease, color .16s ease, background .16s ease; }
        .delete-button:hover { color: #b42318; background: #fff7f5; transform: translateY(-2px); }
        .delete-button svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
        .output-meta { gap: 10px; margin: 21px 0 7px; }
        .output-rule { height: 1px; flex: 1; background: rgba(17, 24, 39, .12); }
        .result { min-height: 55px; display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 12px 15px; border: 1px dashed rgba(37, 99, 235, .32); border-radius: 8px; background: #f8faff; }
        .result-label { color: var(--blue); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .result-value { min-width: 0; overflow-wrap: anywhere; color: var(--blue-dark); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 22px; font-weight: 800; text-align: right; }
        .result-error { border-color: rgba(180, 35, 24, .35); background: #fff7f5; }
        .result-error .result-label, .result-error .result-value { color: #b42318; }
        .result-error .result-value { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; font-weight: 600; }
        .keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; margin-top: 18px; }
        .key { height: 53px; border: 1px solid rgba(17, 24, 39, .13); border-radius: 8px; color: var(--ink); background: var(--paper); box-shadow: 0 2px 0 rgba(17, 24, 39, .06); cursor: pointer; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 18px; font-weight: 600; transition: transform .16s ease, border-color .16s ease, background .16s ease, box-shadow .16s ease; }
        .key:hover { border-color: rgba(37, 99, 235, .45); background: #f8faff; box-shadow: 0 4px 0 rgba(37, 99, 235, .1); transform: translateY(-2px); }
        .key:active { box-shadow: 0 1px 0 rgba(17, 24, 39, .08); transform: translateY(1px); }
        .key-word { color: var(--blue-dark); background: #eff6ff; border-color: rgba(37, 99, 235, .2); font-size: 14px; }
        .key-word:hover { background: #dbeafe; }
        .key-clear { height: 52px; margin-top: 2px; color: var(--muted); background: #f9fafb; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .key-enter { grid-column: span 2; height: 52px; margin-top: 2px; display: flex; align-items: center; justify-content: center; gap: 10px; border-color: var(--blue); color: var(--paper); background: linear-gradient(135deg, var(--blue), #3b82f6); box-shadow: 0 4px 0 var(--blue-dark); font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }
        .key-enter:hover { border-color: var(--blue-dark); color: var(--paper); background: linear-gradient(135deg, var(--blue-dark), var(--blue)); box-shadow: 0 6px 0 #1e40af; }
        .enter-arrow { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 19px; font-weight: 400; }
        .shortcut-row { justify-content: flex-start; gap: 15px; margin-top: 17px; font-size: 9px; }
        kbd { padding: 2px 5px; border: 1px solid rgba(17, 24, 39, .17); border-bottom-width: 2px; border-radius: 4px; color: var(--muted); background: var(--paper-soft); font-family: inherit; font-size: 9px; }
        .orbit-card { position: absolute; z-index: 10; width: 230px; padding: 18px; border: 1px solid rgba(17, 24, 39, .15); border-radius: 9px; background: rgba(255, 255, 255, .92); box-shadow: 0 12px 25px -10px rgba(17, 24, 39, .22), 4px 5px 0 rgba(17, 24, 39, .05); }
        .guide-card { top: 126px; left: 3%; transform: rotate(-3.2deg); }
        .operator-card { top: 218px; right: 3%; transform: rotate(3.5deg); }
        .file-label { display: flex; align-items: center; gap: 7px; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
        .folder-icon { position: relative; display: inline-block; width: 15px; height: 11px; border: 1px solid #1d4ed8; border-radius: 2px; background: #60a5fa; }
        .folder-icon::before { content: ''; position: absolute; top: -4px; left: 1px; width: 7px; height: 4px; border: 1px solid #1d4ed8; border-bottom: 0; border-radius: 2px 2px 0 0; background: #93c5fd; }
        .mini-badge { display: grid; width: 15px; height: 15px; place-items: center; border-radius: 4px; color: var(--paper); background: var(--ink); font-family: Georgia, serif; font-size: 11px; }
        .orbit-card h2 { margin: 16px 0 13px; font-size: 19px; letter-spacing: -.04em; }
        .guide-list { display: grid; gap: 9px; padding: 0; margin: 0; list-style: none; color: var(--muted); font-size: 11px; line-height: 1.35; }
        .guide-list li { display: grid; grid-template-columns: 22px 1fr; gap: 5px; }
        .guide-list li > span { color: var(--blue); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight: 700; }
        .guide-list strong { color: var(--ink); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
        .operator-list { display: grid; gap: 10px; margin: 0; }
        .operator-list div { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(17, 24, 39, .1); }
        .operator-list dt { color: var(--blue); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; font-weight: 800; }
        .operator-list dd { margin: 0; color: var(--muted); font-size: 10px; text-align: right; }
        .operator-example { margin: 14px 0 0; color: var(--ink); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
        .operator-example span { padding: 0 4px; color: var(--blue); }
        .paperclip { position: absolute; top: -8px; right: 25px; width: 13px; height: 31px; border: 2px solid #9ca3af; border-bottom: 0; border-radius: 8px 8px 0 0; transform: rotate(8deg); }
        .workspace-sticker { position: absolute; right: 20%; bottom: 49px; z-index: 7; display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 7px; padding: 10px 12px; border: 1px solid #f0c56d; border-radius: 5px; color: #92400e; background: #fef3c7; box-shadow: 3px 4px 0 rgba(146, 64, 14, .1); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; line-height: 1.05; text-transform: uppercase; transform: rotate(-4deg); }
        .sticker-star { color: #d97706; font-size: 19px; }
        .kaomoji { position: absolute; z-index: 4; color: #6b7280; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
        .kaomoji-one { top: 62px; right: 24%; transform: rotate(4deg); }
        .kaomoji-two { bottom: 81px; left: 25%; transform: rotate(-5deg); }
        .workspace-footer { position: relative; z-index: 5; display: flex; justify-content: space-between; width: min(100%, 1180px); margin: -8px auto 0; }
        .footer-note { margin: 0; color: var(--muted); font-size: 11px; }
        .footer-note strong { color: var(--ink); }
        .footer-mark { color: var(--faint); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
        @media (max-width: 980px) {
          .workspace { padding-right: 22px; padding-left: 22px; }
          .workspace-stage { min-height: 700px; }
          .guide-card { left: 0; }
          .operator-card { right: 0; }
          .workspace-sticker { right: 15%; }
        }
        @media (max-width: 760px) {
          .workspace { padding: 25px 16px 24px; }
          .workspace-header { align-items: flex-start; }
          .hero-meta { display: none; }
          .workspace-stage { display: flex; flex-direction: column; gap: 18px; min-height: 0; margin-top: 28px; padding: 16px 0 7px; }
          .workspace-stage::before { inset: 0; border-radius: 18px; }
          .stage-label { top: -15px; left: 3px; }
          .stage-coordinates { right: 5px; bottom: -15px; }
          .calculator { position: relative; top: auto; left: auto; width: 100%; transform: none; order: 1; }
          .guide-card, .operator-card { position: relative; top: auto; right: auto; left: auto; width: 100%; transform: none; }
          .guide-card { order: 2; }
          .operator-card { order: 3; }
          .workspace-sticker, .kaomoji { display: none; }
          .workspace-footer { display: block; margin-top: 22px; text-align: center; }
          .footer-mark { display: block; margin-top: 7px; }
        }
        @media (max-width: 420px) {
          .brand-mark { width: 37px; height: 37px; font-size: 21px; }
          h1 { font-size: 28px; }
          .calculator-body { padding: 17px 14px 15px; }
          .window-title { font-size: 9px; }
          .display { min-height: 78px; padding: 14px; font-size: 17px; }
          .delete-button { width: 57px; flex-basis: 57px; }
          .keypad { gap: 7px; }
          .key { height: 49px; }
          .key-clear, .key-enter { height: 49px; }
          .shortcut-row { gap: 9px; font-size: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <main className="workspace" aria-labelledby="workspace-title">
        <header className="workspace-header">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">∴</span>
            <div>
              <p className="eyebrow">a little number workspace</p>
              <h1 id="workspace-title">hello <span>div n mod calc</span></h1>
            </div>
          </div>
          <div className="hero-meta" aria-label="Workspace status">
            <span className="mode-pill"><span className="live-dot" aria-hidden="true" /> local workspace</span>
            <span className="file-stamp">v1.0 / integer tools</span>
          </div>
        </header>
        <section className="workspace-stage" aria-label="Calculator workspace">
          <span className="stage-label">/home/number-person/desktop</span>
          <span className="stage-coordinates">x: 042 · y: 118 · zoom: 100%</span>
          <span className="kaomoji kaomoji-one" aria-hidden="true">^ ω ^</span>
          <span className="kaomoji kaomoji-two" aria-hidden="true">¯\\_(ツ)_/¯</span>
          <QuickStartCard />
          <InputPanel />
          <OperatorCard />
          <WorkspaceSticker />
        </section>
        <footer className="workspace-footer">
          <p className="footer-note"><span className="file-caption">workspace/README.md</span> · <strong>div</strong> gives the quotient, <strong>mod</strong> gives the remainder.</p>
          <span className="footer-mark">made for small steps ✦</span>
        </footer>
      </main>
    </>
  );
}
