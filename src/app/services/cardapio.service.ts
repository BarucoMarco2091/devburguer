import { Injectable } from "@angular/core";

interface Pastel {
    name: string;
    description: string;
    price: number;
    image: string;
}

@Injectable({
    providedIn: 'root'
})

export class CardapioService {
    private STORAGE_KEY = 'hamburgueria-cardapio';
    private _menuItems: Pastel[] = [
        { name: 'Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 40.00, image: '/cheeseburger.webp' },
        { name: 'Double Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 45.00, image: '/doublecheeseburger.webp' },
        { name: 'Batata Frita', description: 'Nossas fritas com uma cobertura irresistível de mix de queijos e bacon. O toque final fica por conta do molho Ranch.', price: 20.00, image: '/frenchfries.webp' },
        { name: 'Hot Dog', description: 'Pão especial para hot dog, salsicha, molho de tomate caseiro temperado, purê de batata cremoso, milho verde, vinagrete fresco.', price: 25.00, image: '/hotdog.webp' },
        { name: 'Onion Rings', description: 'Feitos com cebolas selecionadas, eles são uma combinação de crocância e sabor em cada pedaço.', price: 20.00, image: '/onionrings.webp' },
        { name: 'Picanha Burger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 50.00, image: '/picanhaburger.webp' },
        { name: 'Rib Burger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 30.00, image: '/ribburger.webp' },
    ];
cardapioItems: any;

    get menuItems(): Pastel[] {
        return this._menuItems;
    }

    adicionarPastel(pastel: Pastel) {
        this ._menuItems.push(pastel);
        this.salvarNoLocalStorage();
    }

    removerPastel(index: number) {
        this ._menuItems.splice(index, 1);
        this.salvarNoLocalStorage();
    }

    private salvarNoLocalStorage() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._menuItems));
    }

    constructor() {
        const salvos = localStorage.getItem(this.STORAGE_KEY);
        if (salvos) {
            this._menuItems = JSON.parse(salvos);
        }
    }
}