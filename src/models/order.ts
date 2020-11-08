import { Reference } from './reference';
import { Payment } from './payment';
import { ItemOrder } from './item-order';

export interface Order {
	cliente: Reference;
	enderecoDeEntrega: Reference;
	pagamento: Payment;
	itens: ItemOrder[];
}