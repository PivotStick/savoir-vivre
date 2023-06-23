<script>
	import { invalidateAll } from "$app/navigation";

	export let data;

	/**
	 * @type {{
	 *  name: string;
	 *  items: {
	 *      name: string;
	 *      orders: string[];
	 *  }[];
	 * }[]}
	 */
	$: categories = data.menu.categories;

	let saving = false;

	const reset = () => {
		categories.forEach((category) => {
			category.items = [];
		});

		categories = categories;
	};

	const resetOrders = () => {
		categories.forEach((category) => {
			category.items.forEach((item) => {
				item.orders = [];
			});
		});

		categories = categories;
	};

	const save = async () => {
		saving = true;

		try {
			const res = await fetch("/api/menu", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(categories)
			}).then((res) => res.json());

			console.log(res);
		} catch (error) {
			console.error(error);
		} finally {
			saving = false;
		}
	};
</script>

<div class="page">
	<div class="actions">
		<button on:click={reset}><i class="fa fa-trash" /> Reset</button>
		<button on:click={invalidateAll}><i class="fa fa-sync" /> Sync</button>
		<button on:click={resetOrders}><i class="fa fa-hand" /> Reset Orders</button>
	</div>

	<ul class="categories">
		{#each categories as category}
			<li class="categories__category">
				<p class="categories__name">{category.name}</p>
				<ul class="items">
					{#each category.items as item}
						<li class="items__item">
							<div class="details">
								<input class="name" type="text" bind:value={item.name} />

								{#if item.orders.length}
									<ul class="items__orders">
										<li class="count">{item.orders.length}</li>
										{#each item.orders as order}
											<li>{order}</li>
										{/each}
									</ul>
								{/if}
							</div>
							<div class="items__actions">
								<i
									class="fa fa-trash danger"
									on:click={() => {
										category.items = category.items.filter((i) => i !== item);
									}}
								/>
							</div>
						</li>
					{/each}
					<li class="items__add">
						<button
							on:click={() => {
								category.items.push({ name: "", orders: [] });
								category.items = category.items;
							}}><i class="fa fa-plus" /></button
						>
					</li>
				</ul>
			</li>
		{/each}
	</ul>

	<div class="bottom-actions">
		<button disabled={saving} on:click={save} class="success"><i class="fa fa-save" /> Save</button>
	</div>
</div>

<style lang="scss">
	.page {
		padding: 1.5rem;
		padding-bottom: calc(1.5rem + 3rem);
	}

	.actions {
		margin-bottom: 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;

		button {
			flex: 1;
		}
	}

	.categories {
		display: flex;
		flex-direction: column;

		gap: 4rem;

		&__name {
			font-size: 1.5rem;
			font-weight: 900;
			margin-bottom: 1rem;
		}
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__add {
			margin-top: 1rem;

			button {
				width: max-content;
			}
		}

		&__item {
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 1rem;
		}

		&__actions {
			i {
				cursor: pointer;

				background-color: var(--color-200);
				color: var(--on-color-200);

				$size: 2rem;

				width: $size;
				height: $size;

				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;

				transition-property: opacity;

				&:active {
					opacity: 0.5;
				}
			}
		}

		&__orders {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-top: 0.5rem;

			li {
				font-size: 0.8rem;
				font-weight: 700;
				background-color: var(--color-200);
				color: var(--on-color-200);
				padding: 0.25rem 0.75rem;
				border-radius: 2rem;

				&.count {
					background-color: var(--color-900);
					color: var(--on-color-900);
				}
			}
		}
	}

	.bottom-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;

		margin-top: 5rem;
	}
</style>
