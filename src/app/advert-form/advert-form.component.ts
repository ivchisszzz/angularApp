import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Advert } from '../advert.entities';
import { AdvertService } from '../services/advert-service';

@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.css'],
})
export class AdvertFormComponent implements OnInit {
  types: string[] = ['Part-time', 'Full-time', 'Remote'];
  categories: string[] = [
    'Office-Administration',
    'Development',
    'Management',
    'Suplies',
  ];
  constructor(
    private advertService: AdvertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.advert = {
      title: '',
      description: '',
      type: '',
      category: '',
      likesNumbers: 0,
      isActive: true,
      createdBy: null,
    };
  }
  advert: Advert;

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    if (params.id) {
      this.getAdvert(params.id);
    }
  }

  private getAdvert(id: number): void {
    this.advertService
      .getAdvert(id)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.advert = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSubmit() {
    if (!this.advert.id) {
      this.advertService.createAdvert(this.advert).subscribe();
      this.router.navigate(['/adverts']);

      return;
    } else {
      this.advertService
        .updateAdvert(this.advert)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/adverts']);
        });
    }
  }
}
