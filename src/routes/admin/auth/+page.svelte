<script>
	import { enhance } from "$app/forms";
	import Input from "$lib/components/Input.svelte";

	export let form;
</script>

<div class="page">
	<form method="post" use:enhance>
		<h1>S'identifier</h1>
		<Input name="identifier" placeholder="Identifiant" errors={form?.identifier} />
		<Input name="password" type="password" placeholder="Mot de passe" errors={form?.password} />
		<button type="submit">Se connecter <i class="fa fa-arrow-right" /></button>
	</form>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		form {
			h1 {
				font-size: 2rem;
				font-weight: 900;
			}

			display: grid;
			gap: 1rem;
		}
	}
</style>
