import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-banner',
  standalone: true,
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.css']
})
export class LandingBannerComponent {
  title = 'Equipo Basket';
  subtitle = 'Angular Force';
}