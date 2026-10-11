import React, { useState } from 'react';

const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'div', '0', 'mod'];

function Display({ value }) {
  return (
    <div className="display" aria-live="polite" aria-label="Current input">
      {value ? <span>{value}</span> : <span className="display-hint">Your input will appear here</span>}
    </div>
  );
}

function Keypad({ onKey }) {
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
      <button className="key key-enter" type="button" aria-label="Enter">
        enter <span aria-hidden="true">↵</span>
      </button>
    </div>
  );
}

function InputPanel() {
  const [value, setValue] = useState('');

  function addKey(key) {
    const token = key === 'div' || key === 'mod' ? ` ${key} ` : key;
    setValue((current) => `${current}${token}`);
  }

  function deleteCharacter() {
    setValue((current) => current.slice(0, -1));
  }

  return (
    <section className="calculator" aria-label="div and mod input pad">
      <div className="display-row">
        <Display value={value} />
        <button className="delete-button" type="button" onClick={deleteCharacter} aria-label="Delete last character">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4h6m-9 3h12l-1 13H7L6 7Zm3 3v7m4-7v7" />
          </svg>
          <span>delete</span>
        </button>
      </div>
      <Keypad onKey={addKey} />
    </section>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        :root { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #202522; background: #f5f3ef; font-synthesis: none; }
        * { box-sizing: border-box; }
        body { margin: 0; min-width: 320px; min-height: 100vh; }
        button { font: inherit; }
        .page { min-height: 100vh; display: grid; place-items: center; padding: 48px 20px; position: relative; overflow: hidden; }
        .page::before, .page::after { content: ''; position: absolute; width: 380px; height: 380px; border: 1px solid #e8e4dc; border-radius: 50%; pointer-events: none; }
        .page::before { top: -245px; left: -135px; box-shadow: 0 0 0 28px #f5f3ef, 0 0 0 29px #e8e4dc, 0 0 0 58px #f5f3ef, 0 0 0 59px #e8e4dc; }
        .page::after { bottom: -285px; right: -120px; width: 450px; height: 450px; box-shadow: 0 0 0 28px #f5f3ef, 0 0 0 29px #e8e4dc, 0 0 0 58px #f5f3ef, 0 0 0 59px #e8e4dc; }
        .content { width: min(100%, 470px); position: relative; z-index: 1; }
        .intro { text-align: center; margin-bottom: 32px; }
        .eyebrow { color: #788179; font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; margin: 0 0 13px; }
        h1 { font-size: clamp(30px, 8vw, 42px); line-height: 1.12; letter-spacing: -.055em; margin: 0; font-weight: 800; }
        h1 span { color: #72927c; }
        .subtitle { margin: 12px 0 0; color: #818780; font-size: 14px; }
        .calculator { padding: 22px; background: #fff; border: 1px solid #e9e7e2; border-radius: 22px; box-shadow: 0 18px 55px rgba(45, 52, 46, .08); }
        .display-row { display: flex; gap: 10px; align-items: stretch; margin-bottom: 16px; }
        .display { min-width: 0; flex: 1; min-height: 76px; padding: 16px 18px; display: flex; align-items: center; overflow-wrap: anywhere; background: #f6f7f4; border: 1px solid #e9ece6; border-radius: 13px; color: #303b32; font-family: 'DM Mono', monospace; font-size: 19px; line-height: 1.45; }
        .display-hint { color: #abb0a9; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; }
        .delete-button { width: 63px; flex: 0 0 63px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; color: #7a827b; background: #fff; border: 1px solid #e8e9e5; border-radius: 13px; font-size: 10px; cursor: pointer; transition: .16s ease; }
        .delete-button:hover { color: #ba5c4e; border-color: #e9c9c1; background: #fffaf8; }
        .delete-button svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
        .keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .key { height: 59px; border: 1px solid #e8e9e4; border-radius: 12px; background: #fff; color: #313832; font-family: 'DM Mono', monospace; font-size: 19px; font-weight: 500; cursor: pointer; transition: transform .12s ease, background .12s ease, border-color .12s ease; }
        .key:hover { background: #f4f7f2; border-color: #cfd9cf; }
        .key:active { transform: scale(.97); }
        .key-word { color: #557760; background: #f2f6f0; border-color: #e2eae0; font-size: 15px; }
        .key-word:hover { background: #e9f1e7; border-color: #cbd9c9; }
        .key-enter { grid-column: 1 / -1; height: 54px; margin-top: 3px; display: flex; justify-content: center; align-items: center; gap: 9px; border-color: #58765f; background: #58765f; color: white; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; cursor: default; }
        .key-enter span { font-size: 18px; font-weight: 400; }
        .key-enter:hover { background: #58765f; }
        .footer-note { margin: 17px 0 0; color: #a0a49e; text-align: center; font-size: 11px; }
        @media (max-width: 420px) { .calculator { padding: 16px; border-radius: 18px; } .keypad { gap: 8px; } .key { height: 55px; } }
      `}</style>
      <main className="page">
        <div className="content">
          <header className="intro">
            <p className="eyebrow">A little number workspace</p>
            <h1>hello <span>div n mod calc</span></h1>
            <p className="subtitle">Enter a sequence with the keypad below.</p>
          </header>
          <InputPanel />
          <p className="footer-note">div and mod are added as input keywords</p>
        </div>
      </main>
    </>
  );
}

