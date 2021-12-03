export interface BlendConfigProps {
  blenderid: number;
  maxuse: number;
  maxuseruse: number;
  maxusercooldown: number;
  total_uses: number;
  startdate: number;
  enddate: number;

  whitelists: string[];
  enable_whitelists: number; // 0 == false, 1 == true
}
