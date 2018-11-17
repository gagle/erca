export interface SvgPath {
  d: string;
  fill?: string;
  opacity?: string;
}

export interface SvgIcon {
  viewBox: {
    width: number;
    height: number;
  };
  paths: SvgPath[];
}
