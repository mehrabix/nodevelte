<script>
    import { onMount } from "svelte";
    import "../app.css";
    import {slide} from 'svelte/transition';
    let transactions = [];
    let inputValue = "";
    let valueDeleted = false;
    let valueAdded = false;
    $: isButtonDisabled = inputValue.length === 0;

    onMount(() => {
        fetch("/api/transactions")
            .then((res) => res.json())
            .then((data) => {
                transactions = data;
            });
    });

    const addValue = () => {
        let obj = {
            value: inputValue,
        };
        fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        }).then((res) => {
            fetch("/api/transactions")
                .then((res) => res.json())
                .then((data) => {
                    transactions = data;
                });
            inputValue = "";
            valueAdded = true;
            valueDeleted = false;
        });
    };
    const deleteValue = (id) => {
        fetch("/api/transactions/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            fetch("/api/transactions")
                .then((res) => res.json())
                .then((data) => {
                    transactions = data;
                });
            valueAdded = false;
            valueDeleted = true;
        });
    };
</script>

<div dir="rtl" class="flex justify-center flex-col items-center h-screen">
    <input
        class="input input-bordered w-full max-w-xs"
        bind:value={inputValue}
        type="text"
        placeholder="عدد بنویس..."
    />
    <button
        disabled={isButtonDisabled}
        class="btn btn-success mt-5"
        on:click={addValue}>add</button
    >
    {#each transactions as t}
        <div transition:slide={{duration:1000}} class="flex items-center justify-between gap-x-5 mt-6">
            <div class="badge badge-primary">
                {t.value}
            </div>
            <button class="btn btn-error" on:click={() => deleteValue(t._id)}
                >حذف</button
            >
        </div>
    {/each}
    {#if valueAdded && setTimeout(() => {
            valueAdded = false;
        }, 3000)}
        <div class="alert alert-success shadow-lg w-3/5 mt-10">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                >
                <span>مقدار اضافه شد</span>
            </div>
        </div>
    {/if}
    {#if valueDeleted && setTimeout(() => {
            valueDeleted = false;
        }, 3000)}
        <div class="alert alert-error shadow-lg w-3/5 mt-10">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                >
                <span>مقدار حذف شد</span>
            </div>
        </div>
    {/if}
</div>
