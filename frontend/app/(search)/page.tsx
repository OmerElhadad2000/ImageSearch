"use client";

import {useActionState} from "react";
import DisplaySearchResults from "@/app/(search)/DisplaySearchResults";
import {searchImage} from "@/app/(search)/SearchLogic";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function SearchPage() {
    const [state, action, is_pending] = useActionState(searchImage, undefined);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <h1 className="text-6xl font-bold text-white mb-8 mt-8">Search An Image</h1>

            <div className="w-full max-w-4xl">
                <form action={action} className="flex space-x-2 w-full">
                    <Input
                        type="text"
                        name="query"
                        id="query"
                        placeholder="Search..."
                        className="flex-1 text-white placeholder-white"
                    />
                    <Input
                        type="number"
                        name="matchingAmount"
                        placeholder="Images"
                        min={1}
                        max={50}
                        className="w-24 text-white"
                    />
                    <Button type="submit" disabled={is_pending}>
                        {is_pending ? "Searching..." : "Search"}
                    </Button>
                </form>

                {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

                {state?.images && (
                    <div className="flex  w-full">
                        <DisplaySearchResults images={state.images} query={state.query ?? ""}/>
                    </div>
                )}
            </div>
        </div>
    );
}
