import { Type } from '@angular/core';

export interface LazyCmpLoadedEvent {
    selector: string;
    componentClass: Type<any>;
}
