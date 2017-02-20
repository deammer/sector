interface NodeRequire extends NodeRequireFunction {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?:string ) => void;
}
