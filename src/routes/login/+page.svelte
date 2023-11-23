<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let form;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

{#if form?.error}
	<div class="alert alert-warning">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/></svg
		>
		<span>{form.error}</span>
	</div>
{/if}

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse gap-12">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Войдите прямо сейчас!</h1>
			<p class="py-6">
				How to paint. That's easy. What to paint. That's much harder. We tell people sometimes:
				we're like drug dealers, come into town and get everybody absolutely addicted to painting.
				It doesn't take much to get you addicted.
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
			<form class="card-body" method="post" use:enhance={handleSubmit}>
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						class="input input-bordered"
						name="email"
						value={form?.values.email ?? ''}
						required
					/>
				</div>
				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Пароль</span>
					</label>
					<input
						id="password"
						type="password"
						placeholder="Пароль"
						class="input input-bordered"
						name="password"
						required
					/>
					<label class="label" for="#">
						<a href="/login/update-password" class="label-text-alt link link-hover">Забыли пароль?</a>
					</label>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary" disabled={loading}
						>{!loading ? 'Войти' : 'Загрузка...'}</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
