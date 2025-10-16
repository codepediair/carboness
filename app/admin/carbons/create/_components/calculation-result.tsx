"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { number } from "zod";

type CalcResult = {
  totalCO2e: number;
  byScope: Record<string, number>;
  byUnit: Record<string, number>;
};

export default function CalculationsCard() {
  const [data, setData] = React.useState<CalcResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Optional filters
  const [userId, setUserId] = React.useState<string>("");
  const [scope, setScope] = React.useState<string>("");
  const [subCategoryId, setSubCategoryId] = React.useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (userId) params.set("userId", userId);
      if (scope) params.set("scope", scope);
      if (subCategoryId) params.set("subCategoryId", subCategoryId);

      const res = await fetch(`/api/calculations${params.toString() ? `?${params.toString()}` : ""}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `Request failed with status ${res.status}`);
      }
      const json: CalcResult = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Calculation results</CardTitle>
        <CardDescription>View total CO₂e and breakdowns by scope and unit</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">User ID</label>
            <Input
              placeholder="Optional userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Scope</label>
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger>
                <SelectValue placeholder="Any scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scope1">scope1</SelectItem>
                <SelectItem value="scope2">scope2</SelectItem>
                <SelectItem value="scope3">scope3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Sub category ID</label>
            <Input
              placeholder="Optional subCategoryId (UUID)"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
            />
          </div>

          <div className="md:col-span-4 flex items-end justify-end">
            <Button onClick={fetchData} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Total CO₂e</p>
            <p className="text-xl font-semibold">{data ? Number(data.totalCO2e).toFixed(2) : "-"}</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Scopes count</p>
            <p className="text-xl font-semibold">{data ? Object.keys(data.byScope).length : "-"}</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Units count</p>
            <p className="text-xl font-semibold">{data ? Object.keys(data.byUnit).length : "-"}</p>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-md border border-destructive p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* By scope table */}
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-semibold">By scope</h3>
              <p className="text-sm text-muted-foreground">CO₂e grouped by scope</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scope</TableHead>
                  <TableHead className="text-right">CO₂e</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && Object.entries(data.byScope).length > 0 ? (
                  Object.entries(data.byScope).map(([scopeKey, value]) => (
                    <TableRow key={scopeKey}>
                      <TableCell className="font-medium">{scopeKey}</TableCell>
                      <TableCell className="text-right">{Number(value).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No scope data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* By unit table */}
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-semibold">By unit</h3>
              <p className="text-sm text-muted-foreground">Amounts grouped by unit</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && Object.entries(data.byUnit).length > 0 ? (
                  Object.entries(data.byUnit).map(([unitKey, value]) => (
                    <TableRow key={unitKey}>
                      <TableCell className="font-medium">{unitKey}</TableCell>
                      <TableCell className="text-right">{Number(value).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No unit data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
