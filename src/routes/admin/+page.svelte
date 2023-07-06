<script>
	import MenuItemImage from "$lib/components/MenuItemImage.svelte";

	export let data;
</script>

<div class="page">
	<h1>Réservations</h1>

	<ul>
		{#each data.bookings as booking}
			<li class="booking">
				<h1 class="referent">Au nom de <span>"{booking.referent}"</span></h1>
				<p class="customer-count">
					<span>{booking.orders.length}</span> personne{booking.orders.length > 1 ? "s" : ""}
				</p>
				<ul class="orders">
					{#each data.menu.categories as category}
						<li class="order">
							<p class="order__name">{category.name}</p>
							<ul class="order__items">
								{#each category.items as item}
									{@const customers = booking.orders.filter((o) => o.items.includes(item.id))}
									<li class="item">
										<div class="item__image">
											<MenuItemImage src={item.image} />
										</div>
										<p class="item__name">
											{item.name}
										</p>
										<div class="customers">
											<span>{customers.length}</span>
											{#each customers as customer}
												<span>{customer.username}</span>
											{/each}
										</div>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		> h1 {
			font-size: 2rem;
			font-weight: 900;
			margin-bottom: 2rem;
		}
	}

	.orders {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		margin-top: 1rem;
	}

	.order {
		&:not(:last-child) {
			border-bottom: 1px solid var(--color-100);
			padding-bottom: 1rem;
		}

		&__name {
			font-weight: 900;
			font-size: 1.25rem;
			margin-bottom: 1rem;
		}

		&__items {
			display: grid;
			gap: 0.5rem;
		}
	}

	.item {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
		gap: inherit;

		&__image {
			grid-row: 1 / -1;
		}

		&__name {
			font-size: 1.125rem;
			font-weight: 700;
		}

		span {
			background-color: white;
			padding: 0.25rem 0.75rem;
			border-radius: 1rem;

			&:first-of-type {
				background-color: var(--color-800);
				color: var(--on-color-800);
			}
		}
	}

	.booking {
		background-color: var(--color-50);
		padding: 1rem;
		border-radius: 0.5rem;

		.referent {
			margin-bottom: 0.5rem;
			font-size: 1.25rem;

			span {
				font-weight: 600;
				font-style: italic;
			}
		}

		.customer-count {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			span {
				background-color: var(--color-900);
				color: var(--on-color-900);

				padding: 0.25rem 0.75rem;
				border-radius: 2rem;
			}
		}
	}
</style>
