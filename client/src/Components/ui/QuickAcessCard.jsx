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
                ? "bg-blue-600"
                : type === "goal"
                ? "bg-green-500"
                : type === "budget"
                ? "bg-red-500"
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
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    border-radius: 20px;
    transition: all 0.3s;
  }

  .card2 {
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    padding: 0 30px;

    border-radius: 20px;
    transition: all 0.2s;
    transform: scale(0.98);
  }

  .card:hover {
    box-shadow: 0 0 30px 5px rgba(55, 0, 255, 0.3);
    transform: scale(1.02);
  }
  @media (max-width: 640px) {
    .card {
      max-width: 110px;
    }
    .card2 {
      padding:10px; /* Remove padding on small screens */
    }
  }
`;

export default QuickAccessCard;
