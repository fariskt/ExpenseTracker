import React from "react";
import styled from "styled-components";
import useUIStore from "../../store/useUIForm";

const QuickAccessCard = ({ quickAccess }) => {
  const { setShowForm } = useUIStore();
  const type = quickAccess.type;

  return (
    <StyledWrapper>
      <div
        className="card cursor-pointer"
        onClick={() => setShowForm(quickAccess.type)}
      >
        <div className="card2 flex items-center justify-center gap-2 md:gap-3">
          <span
            className={`rounded-full ${
              type === "expenses"
                ? "bg-blue-400"
                : type === "goal"
                ? "bg-green-400"
                : type === "budget"
                ? "bg-red-400"
                : "bg-orange-400"
            } p-2 md:p-3`}
          >
            {quickAccess.icon}
          </span>
          <h3 className="font-bold text-xs md:text-sm">{quickAccess.text}</h3>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 80px;
    border: 1px solid gray;
    border-radius: 20px;
    transition: all 0.3s;
  }

  .card2 {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding: 0 30px;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out;
    transform: scale(0.98);
  }

  .card:hover {
    transform: scale(1.02);
  }
`;


export default QuickAccessCard;
