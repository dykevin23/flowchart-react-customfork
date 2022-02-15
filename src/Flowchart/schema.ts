import React, { CSSProperties } from "react";

export interface NodeData {
  id: number;
  name: string;
  type: NodeType;
  approveMethod?: number;
  editableFields?: string;
  approvers?: {id: number, name: string}[];
  x: number;
  y: number;
}

export interface ConnectionData {
  id: number;
  type: "pass" | "reject";
  source: {
    id: number;
    position: ConnectorPosition;
  };
  destination: {
    id: number;
    position: ConnectorPosition;
  };
}

export interface Point {
  x: number;
  y: number;
}

export type Line = [Point, Point];

export interface SelectionInfo {
  start: Point;
  end: Point;
}

export type ConnectorPosition = "left" | "right" | "top" | "bottom";
export type NodeType = "start" | "end" | "operation";
export type NodeRender = (data: NodeData) => string | undefined | null;

export interface FlowchartProps {
  render?: NodeRender;
  style?: CSSProperties;
  defaultNodes: NodeData[];
  defaultConnections: ConnectionData[];
  onEditNode?: (
    data: NodeData,
    setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>
  ) => void;
  onCreateNode?: (
    data: NodeData,
    setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>
  ) => void;
  onEditConnection?: (
    data: ConnectionData,
    setConnections: React.Dispatch<React.SetStateAction<ConnectionData[]>>
  ) => void;
  onCreateConnection?: (
    data: ConnectionData,
    setConnections: React.Dispatch<React.SetStateAction<ConnectionData[]>>
  ) => void;
  onLoad?: () => void;
  readonly?: boolean;
}

export interface DragMovingInfo {
  targetIds: number[];
  deltas: {
    x: number;
    y: number;
  }[];
  moved?: true;
}

export interface DragConnectionInfo {
  source: NodeData;
  sourcePosition: ConnectorPosition;
}

export interface IFlowchart {
  getData: () => {
    nodes: NodeData[];
    connections: ConnectionData[];
  };
}

export type Direction = "l" | "r" | "u" | "d" | "lu" | "ru" | "ld" | "rd";
