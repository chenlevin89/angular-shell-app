import {Injectable} from "@angular/core";
import {filter, pluck, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PubSubService {

  private readonly subject$ = new Subject<{type: string, value: any}>();
  private readonly observable$ = this.subject$.asObservable();

  notify({type, value}) {
    this.subject$.next({type, value});
  }

  register(eventType) {
    return this.observable$.pipe(filter(({type}) => type === eventType),pluck('value'));
  }

}
