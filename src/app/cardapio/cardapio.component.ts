import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CardapioItem {
  name: string,
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent {

  menuItems = [
    { name: 'Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 40.00, image: '/cheeseburger.webp' },
    { name: 'Double Cheeseburger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 45.00, image: '/doublecheeseburger.webp' },
    { name: 'Batata Frita', description: 'Nossas fritas com uma cobertura irresistível de mix de queijos e bacon. O toque final fica por conta do molho Ranch.', price: 20.00, image: '/frenchfries.webp' },
    { name: 'Hot Dog', description: 'Pão especial para hot dog, salsicha, molho de tomate caseiro temperado, purê de batata cremoso, milho verde, vinagrete fresco.', price: 25.00, image: '/hotdog.webp' },
    { name: 'Onion Rings', description: 'Feitos com cebolas selecionadas, eles são uma combinação de crocância e sabor em cada pedaço.', price: 20.00, image: '/onionrings.webp' },
    { name: 'Picanha Burger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 50.00, image: '/picanhaburger.webp' },
    { name: 'Rib Burger', description: 'Pão levinho de fermentação natural, burger 160g, queijo prato, maionese da casa, alface, tomate, cebola caramelizada.', price: 30.00, image: '/ribburger.webp' },
  ];

  cart: CardapioItem[] = [];
  isModalOpen = false;
  address = '';
  showAddressWarning = false;

  get total(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToCart(name: string, price: number) {
    const existingItem = this.cart.find(item => item.name === name)
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ name, price, quantity: 1 });
    }
  }

  removeItemCart(name: string) {
    const index = this.cart.findIndex(item => item.name === name)
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  checkout() {
    if (this.cart.length === 0) return;

    if (!this.address.trim()) {
      this.showAddressWarning = true;
      return;
    }

    const cartItems = this.cart.map(item => `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`).join(' | ');
    const phone = '5511996221043';
    const message = encodeURIComponent(cartItems + ` Endereço: ${this.address}`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    this.cart = [];
    this.address = '';
    this.showAddressWarning = false;
  }
}
