import React, { useState, useEffect } from "react";
import "./techtrend.css";

const TechTrendPredictionMarket = () => {
  const [predictions, setPredictions] = useState([]);
  const [newPrediction, setNewPrediction] = useState("");
  const [newPredictionDate, setNewPredictionDate] = useState("");
  const [betAmount, setBetAmount] = useState("");

  useEffect(() => {
    // Simulating loading predictions from a database
    const mockPredictions = [
      {
        id: 1,
        statement: "Quantum computers will break current encryption by 2025",
        resolutionDate: new Date("2025-12-31").getTime(),
        resolved: false,
        yesAmount: 50,
        noAmount: 30,
      },
      {
        id: 2,
        statement: "Flying cars will be commercially available by 2026",
        resolutionDate: new Date("2026-12-31").getTime(),
        resolved: false,
        yesAmount: 20,
        noAmount: 80,
      },
    ];
    setPredictions(mockPredictions);
  }, []);

  const createPrediction = () => {
    if (newPrediction && newPredictionDate) {
      const newPredictionObj = {
        id: predictions.length + 1,
        statement: newPrediction,
        resolutionDate: new Date(newPredictionDate).getTime(),
        resolved: false,
        yesAmount: 0,
        noAmount: 0,
      };
      setPredictions([...predictions, newPredictionObj]);
      setNewPrediction("");
      setNewPredictionDate("");
    }
  };

  const placeBet = (id, isPositive) => {
    if (betAmount) {
      setPredictions(
        predictions.map((pred) => {
          if (pred.id === id) {
            return {
              ...pred,
              yesAmount: isPositive
                ? pred.yesAmount + parseFloat(betAmount)
                : pred.yesAmount,
              noAmount: !isPositive
                ? pred.noAmount + parseFloat(betAmount)
                : pred.noAmount,
            };
          }
          return pred;
        })
      );
      setBetAmount("");
    }
  };

  const resolvePrediction = (id, outcome) => {
    setPredictions(
      predictions.map((pred) => {
        if (pred.id === id) {
          return { ...pred, resolved: true, outcome };
        }
        return pred;
      })
    );
  };

  return (
    <div className="prediction-market">
      <h1>Tech Trend Prediction Market</h1>

      <div className="create-prediction">
        <h2>Create New Prediction</h2>
        <input
          type="text"
          placeholder="Prediction"
          value={newPrediction}
          onChange={(e) => setNewPrediction(e.target.value)}
        />
        <input
          type="date"
          value={newPredictionDate}
          onChange={(e) => setNewPredictionDate(e.target.value)}
        />
        <button onClick={createPrediction}>Create</button>
      </div>

      <div className="predictions-list">
        <h2>Active Predictions</h2>
        {predictions.map((prediction) => (
          <div key={prediction.id} className="prediction-card">
            <h3>{prediction.statement}</h3>
            <p>
              Resolution Date:{" "}
              {new Date(prediction.resolutionDate).toLocaleDateString()}
            </p>
            <p>Status: {prediction.resolved ? "Resolved" : "Active"}</p>
            {prediction.resolved && (
              <p>Outcome: {prediction.outcome ? "True" : "False"}</p>
            )}
            <div className="bet-amounts">
              <div
                className="yes-amount"
                style={{
                  width: `${
                    (prediction.yesAmount /
                      (prediction.yesAmount + prediction.noAmount)) *
                    100
                  }%`,
                }}
              >
                Yes: {prediction.yesAmount}
              </div>
              <div
                className="no-amount"
                style={{
                  width: `${
                    (prediction.noAmount /
                      (prediction.yesAmount + prediction.noAmount)) *
                    100
                  }%`,
                }}
              >
                No: {prediction.noAmount}
              </div>
            </div>
            {!prediction.resolved && (
              <div className="betting-controls">
                <input
                  type="number"
                  placeholder="Bet Amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
                <button onClick={() => placeBet(prediction.id, true)}>
                  Bet Yes
                </button>
                <button onClick={() => placeBet(prediction.id, false)}>
                  Bet No
                </button>
              </div>
            )}
            {!prediction.resolved && (
              <div className="resolve-controls">
                <button onClick={() => resolvePrediction(prediction.id, true)}>
                  Resolve True
                </button>
                <button onClick={() => resolvePrediction(prediction.id, false)}>
                  Resolve False
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTrendPredictionMarket;
