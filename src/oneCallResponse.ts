export interface OneCallResponse {
   current: Current;
   daily: DailyData[];
  }

  export interface Current {
    weather: Weather[];
    temp: number;
  }

  export interface Weather {
    main: string;    
  }

  export interface DailyData {
    dt: Date;
    weather: Weather[];
    temp: Temp;
  }

  export interface Temp {
      min: number;
      max: number;
  }