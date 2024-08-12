// any型を許容する
export const EventTypes = new Map<string, any>();

// IEventを埋め込んだクラスにのみ使う
export function DomainEvent(name: string): ClassDecorator {
  return function (target: any) {
    EventTypes.set(name, target);
  };
}
