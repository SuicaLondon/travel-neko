import React, { useState } from "react";

export default function AddPlan() {
  const [plans, setPlans] = useState<string[]>([]);
  const [newPlan, setNewPlan] = useState("");

  const addPlan = () => {
    if (newPlan.trim()) {
      setPlans([...plans, newPlan]);
      setNewPlan("");
    }
  };

  const removePlan = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Plans On Day</h1>
      <input
        type="text"
        value={newPlan}
        onChange={(e) => setNewPlan(e.target.value)}
        placeholder="Add a new plan"
      />
      <button onClick={addPlan}>Add Plan</button>
      <ul>
        {plans.map((plan, index) => (
          <li key={index}>
            {plan} <button onClick={() => removePlan(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
