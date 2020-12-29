import { BadgeComponent } from "./components/badge/badge.component";
import { BadgesComponent } from "./components/badges/badges.component";
import { MainPageComponent } from "./components/main-page/main-page.component";

export default [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'badges',
        component: BadgesComponent
    },
    {
        path: 'badges/:name',
        component: BadgeComponent
    }
]