<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Icon from '@iconify/svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	let loading = false;

	const handleLogout: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
			
		};
	};
</script>

<svelte:head>
	<title>Robotek Space</title>
</svelte:head>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Robotek Space</a>
	</div>
	<div class="flex-none">
		{#if session}
			<div class="dropdown dropdown-end">
				<label tabindex="-1" class="btn btn-ghost btn-circle" for="notifications">
					<div class="indicator">
						<Icon icon="material-symbols:notifications-outline" style="font-size: 24px;"/>
						<span class="badge badge-sm indicator-item">8</span>
					</div>
				</label>
				<div
					tabindex="-1"
					class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
				>
					<div class="card-body">
						<span class="font-bold text-lg">8 Items</span>
						<span class="text-info">Subtotal: $999</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block">View cart</button>
						</div>
					</div>
				</div>
			</div>
			<div class="dropdown dropdown-end">
				<label tabindex="-1" class="btn btn-ghost btn-circle avatar" for="profile">
					<div class="w-10 rounded-full">
						<img src="/images/stock/profile.jpg" alt="..." />
					</div>
				</label>
				<ul
					tabindex="-1"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/profile">Профиль</a></li>
					<li><a href="/dashboard">Dashboard</a></li>
					<li><a href="/settings">Настройки</a></li>
					<li>
						<form action="/logout" method="post" use:enhance={handleLogout}>
							<button disabled={loading} type="submit">Выйти</button>
						</form>
					</li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-ghost btn-circle" href="/login">
				<Icon icon="material-symbols:login" style="font-size: 24px;"/>
			</a>
		{/if}
	</div>
</div>

<slot />