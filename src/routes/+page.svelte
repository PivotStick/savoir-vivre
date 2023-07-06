<script>
	import { enhance } from "$app/forms";
	import Input from "$lib/components/Input.svelte";

	export let form;
</script>

<div class="page">
	<form method="post" use:enhance>
		<Input placeholder="Nom du groupe" name="name" errors={form?.errors?.name} />
		<Input placeholder="Au nom de qui ?" name="referent" errors={form?.errors?.referent} />
		<button class="success" type="submit">
			Réserver pour aujourd'hui <i class="fa fa-hand" />
		</button>
	</form>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		form {
			display: grid;
			gap: 1rem;
		}
	}
</style>
