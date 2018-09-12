import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  private titulo: string;

  constructor(private router: Router, private tittle: Title, private meta: Meta) {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      this.tittle.setTitle(data.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);

    });

  }

  ngOnInit() {
  }


  getDataRoute() {
    return this.router.events.pipe(
      filter( evento  => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd)  => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }
}
