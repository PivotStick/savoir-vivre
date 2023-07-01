<script>
	// @ts-ignore
	export let data;

	const key = "__USERNAME__";

	let saving = false;
	let name = (localStorage.getItem(key) || prompt("Ton nom 😎"))?.toLowerCase().slice(0, 15);

	/** @type {Record<string, string>} */
	let orders = data.menu.categories.reduce((a, c) => {
		c.items.forEach((item) => {
			// @ts-ignore
			if (item.orders.includes(name)) {
				// @ts-ignore
				a[c.name] = item.name;
			}
		});
		return a;
	}, {});

	// @ts-ignore
	$: if (name) {
		localStorage.setItem(key, name);
	}

	const save = async () => {
		saving = true;

		try {
			const res = await fetch("/api/menu", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					name,
					orders: Object.keys(orders).map((category) => `${category}.${orders[category]}`)
				})
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
	{#if name}
		<div class="actions">
			<button
				on:click={() => {
					name = prompt("Ton nouveau nom 😎")?.toLowerCase().slice(0, 15) || name;
				}}
			>
				<i class="fa fa-signature" />
				{name}
			</button>
		</div>

		<ul class="categories">
			{#each data.menu.categories as category}
				<li class="categories__category">
					<h1 class="categories__name">{category.name}</h1>
					<ul class="items">
						{#each category.items as item}
							<li class="items__item">
								<label>
									<p>{item.name}</p>
									<input
										type="radio"
										name={category.name}
										value={item.name}
										bind:group={orders[category.name]}
									/>
								</label>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<div class="bottom-actions">
			<button disabled={saving} class="success" on:click={save}>
				<i class="fa fa-save" /> Enregistrer mon choix
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		> .actions {
			margin-bottom: 3rem;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
		}

		> .bottom-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			margin-top: 3rem;
		}
	}

	.categories {
		display: flex;
		flex-direction: column;
		gap: 3rem;

		&__name {
			font-size: 2rem;
			font-weight: 900;
			margin-bottom: 1rem;
		}
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		&__item {
			label {
				cursor: pointer;

				background-color: var(--color-50);
				color: var(--on-color-50);
				padding: 0.5rem 0.75rem;
				display: flex;
				border-radius: 0.5rem;

				outline: 0px solid var(--color-50);

				transition-property: opacity, background-color, outline-width;

				p {
					width: 100%;
				}

				input {
					margin-left: auto;
					width: max-content;
					outline: none;

					accent-color: var(--color-500);
				}

				&:has(input:checked) {
					background-color: var(--color-100);
					color: var(--on-color-100);
				}

				&:active {
					opacity: 0.5;
				}

				&:focus-within {
					outline-width: 4px;
				}
			}
		}
	}
</style>
