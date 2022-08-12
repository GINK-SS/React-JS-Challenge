import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ItemTitle = styled.p`
  font-size: 30px;
  margin-top: 80px;
  margin-bottom: 20px;
  text-align: center;
`;

const PriceWrapper = styled.div`
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(1, 1, 1, 0.5);
  &:nth-of-type(5) {
    border-bottom: none;
  }
  &:nth-of-type(n + 10) {
    border-bottom: none;
  }
`;
const PriceContent = styled.p<{ isPlus?: boolean; isZero?: boolean }>`
  &:first-child {
    font-size: 18px;
    font-weight: 400;
  }
  &:last-child {
    font-weight: 400;
    color: ${(props) => (props.isZero ? "#eee" : props.isPlus ? "#43aa05" : "#e15241")};
  }
`;

const Content = styled.p`
  color: white;
  font-size: 18px;
`;

interface PriceProps {
  coinId: string;
}

interface RouteState {
  percentChange30m: number;
  percentChange1h: number;
  percentChange6h: number;
  percentChange24h: number;
  percentChange7d: number;
  athData: string;
  athPrice: number;
  volume24h: number;
}

function Price({ coinId }: PriceProps) {
  const { state } = useLocation<RouteState>();
  return (
    <>
      <PriceWrapper>
        <Content>거래량(24시간)</Content>
        <Content>${state.volume24h.toFixed(3)}</Content>
      </PriceWrapper>
      <ItemTitle>시간 별 변화</ItemTitle>
      <PriceWrapper>
        <PriceContent>30분</PriceContent>
        <PriceContent
          isZero={state.percentChange30m === 0}
          isPlus={state.percentChange30m > 0}
        >
          {state.percentChange30m}%
        </PriceContent>
      </PriceWrapper>
      <PriceWrapper>
        <PriceContent>1시간</PriceContent>
        <PriceContent
          isZero={state.percentChange1h === 0}
          isPlus={state.percentChange1h > 0}
        >
          {state.percentChange1h}%
        </PriceContent>
      </PriceWrapper>
      <PriceWrapper>
        <PriceContent>6시간</PriceContent>
        <PriceContent
          isZero={state.percentChange6h === 0}
          isPlus={state.percentChange6h > 0}
        >
          {state.percentChange6h}%
        </PriceContent>
      </PriceWrapper>
      <PriceWrapper>
        <PriceContent>24시간</PriceContent>
        <PriceContent
          isZero={state.percentChange24h === 0}
          isPlus={state.percentChange24h > 0}
        >
          {state.percentChange24h}%
        </PriceContent>
      </PriceWrapper>
      <PriceWrapper>
        <PriceContent>7일</PriceContent>
        <PriceContent
          isZero={state.percentChange7d === 0}
          isPlus={state.percentChange7d > 0}
        >
          {state.percentChange7d}%
        </PriceContent>
      </PriceWrapper>

      <ItemTitle>최고</ItemTitle>
      <PriceWrapper>
        <Content>{state.athData.slice(0, 10)}</Content>
        <Content>${state.athPrice.toFixed(3)}</Content>
      </PriceWrapper>
    </>
  );
}

export default Price;
