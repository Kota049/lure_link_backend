import { AggregateRoot } from '@nestjs/cqrs';

export class ApplyingAggregate extends AggregateRoot {
  id: string;
  constructor(id: string) {
    super();
  }
  getStreamId(): string {
    return `Recruitment-${this.id}`;
  }

  create(event: any) {
    // 作成
    // 基本的に全部受け取って、全部埋める
    this.apply(event);
  }

  cancel(event: any) {
    // キャンセルする
    // キャンセルしたときに、支払いをどうするか決める
  }

  determinePickUp(event: any) {
    // ピックアップ場所と時間を指定して、ステータスを決定する
  }

  restitute(event: any) {
    // 返金する
  }
  fix(event: any) {
    // 金額を確定する
  }
}
