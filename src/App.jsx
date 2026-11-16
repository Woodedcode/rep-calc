
import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState(20);
  const [people, setPeople] = useState(1);

  // Calculate bill, tip, and total in cents
  const bill = Math.max(0, Number(amount) || 0);
  const billCents = Math.round(bill * 100);
  const tipCents = Math.round((billCents * tip) / 100);
  const totalCents = billCents + tipCents;

  const tipAmount = tipCents / 100;
  const total = totalCents / 100;
  const perPerson = total / people;

  // Format numbers as dollars
  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Reset calculator
  const handleReset = () => {
    setAmount("");
    setTip(20);
    setPeople(1);
  };

  return (
    <main className="app">
      <div className="calculator">
        <header className="header">
          <div className="logo">RC</div>
          <h1>Rep Calc</h1>
          <p>Calculate your tip and total.</p>
        </header>

        {/* Bill Amount */}
        <section className="card">
          <label htmlFor="amount">Bill Amount</label>

          <div className="amount-input">
            <span>$</span>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </section>

        {/* Tip Percentage */}
        <section className="card">
          <div className="section-header">
            <label htmlFor="tip-slider">
              Tip Percentage
            </label>

            <span className="tip-value">{tip}%</span>
          </div>

          <input
            id="tip-slider"
            className="tip-slider"
            type="range"
            min="0"
            max="50"
            step="1"
            value={tip}
            onChange={(e) =>
              setTip(Number(e.target.value))
            }
          />

          <div className="slider-labels">
            <span>0%</span>
            <span>50%</span>
          </div>

          <div className="tip-buttons">
            {[10, 15, 20, 25].map((percentage) => (
              <button
                type="button"
                key={percentage}
                className={
                  tip === percentage ? "active" : ""
                }
                onClick={() => setTip(percentage)}
              >
                {percentage}%
              </button>
            ))}
          </div>

          <div className="tip-adjust">
            <button
              type="button"
              aria-label="Decrease tip"
              disabled={tip === 0}
              onClick={() =>
                setTip(Math.max(0, tip - 1))
              }
            >
              −
            </button>

            <span>Adjust by 1%</span>

            <button
              type="button"
              aria-label="Increase tip"
              disabled={tip === 50}
              onClick={() =>
                setTip(Math.min(50, tip + 1))
              }
            >
              +
            </button>
          </div>
        </section>

        {/* Split Bill */}
        <section className="card split-card">
          <div>
            <label>Split the Bill</label>
            <p>Number of people</p>
          </div>

          <div className="split-controls">
            <button
              type="button"
              aria-label="Remove person"
              disabled={people === 1}
              onClick={() =>
                setPeople(Math.max(1, people - 1))
              }
            >
              −
            </button>

            <span>{people}</span>

            <button
              type="button"
              aria-label="Add person"
              disabled={people === 100}
              onClick={() =>
                setPeople(Math.min(100, people + 1))
              }
            >
              +
            </button>
          </div>
        </section>

        {/* Results */}
        <section className="results">
          <h2>Bill Summary</h2>

          <div className="result-row">
            <span>Subtotal</span>
            <span>{formatMoney(billCents / 100)}</span>
          </div>

          <div className="result-row">
            <span>Tip ({tip}%)</span>
            <span>{formatMoney(tipAmount)}</span>
          </div>

          <div className="divider"></div>

          <div className="total-section">
            <span>Total Including Tip</span>
            <h3>{formatMoney(total)}</h3>
          </div>

          {people > 1 && (
            <div className="per-person">
              <span>Per Person</span>
              <strong>{formatMoney(perPerson)}</strong>
            </div>
          )}
        </section>

        {/* Reset Button */}
        <button
          type="button"
          className="reset-button"
          onClick={handleReset}
        >
          ↻ Reset Calculator
        </button>

        <footer>
          <p>WoodedCode © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
