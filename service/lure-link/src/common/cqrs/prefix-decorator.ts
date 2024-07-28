import 'reflect-metadata';

export function Prefix(prefix: string): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    // クラスにprefixメンバを追加
    Object.defineProperty(target.prototype, 'prefix', {
      value: prefix,
      writable: false,
      configurable: false,
    });
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getPrefix(target: Function): string | undefined {
  return (target as any).prefix;
}
