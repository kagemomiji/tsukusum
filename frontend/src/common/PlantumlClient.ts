import zlib from "zlib";
import config from "config";

const server: string = config.get('plantuml');

export default class PlantumlClient {
  constructor() {
      
  }
  public static makePlantumlURL(body: string, format: string): string {
      let components = [server.replace(/^\/|\/$/g, ""), format];
      components.push(this.getDiagramURIComponent(body));
      return components.join("/");
  }

  private static getDiagramURIComponent(s: string): string {
    let opt: zlib.ZlibOptions = { level: 9 };
    let d = zlib.deflateRawSync(Buffer.from(s), opt) as Buffer;
    let b = this.encode64(String.fromCharCode(...d.subarray(0)));
    return b;
  }

  
  // from synchro.js
  /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0.1
   * LastModified: Dec 25 1999
   */
  private static encode64 = (data: string): string => {
    let r: string = "";
    for (let i=0; i<data.length; i+=3) {
       if (i+2 == data.length) {
        r += this.append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
      } else if (i+1==data.length) {
        r += this.append3bytes(data.charCodeAt(i), 0, 0);
      } else {
        r += this.append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
        data.charCodeAt(i+2));
      }
    }
    return r;
  }

  private static append3bytes = (b1: number, b2: number , b3: number): string => {
    let c1:number = b1 >> 2;
    let c2:number = ((b1 & 0x3) << 4) | (b2 >> 4);
    let c3:number = ((b2 & 0xF) << 2) | (b3 >> 6);
    let c4:number = b3 & 0x3F;
    let r:string = "";
    r += this.encode6bit(c1 & 0x3F);
    r += this.encode6bit(c2 & 0x3F);
    r += this.encode6bit(c3 & 0x3F);
    r += this.encode6bit(c4 & 0x3F);
    return r;
  }
  

  private static encode6bit = (b:number): string => {
    if (b < 10) {
     return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
     return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
     return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b == 0) {
     return '-';
    }
    if (b == 1) {
     return '_';
    }
    return '?';
  }
}



