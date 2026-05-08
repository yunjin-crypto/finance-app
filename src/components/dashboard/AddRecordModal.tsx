"use client";

import { useState } from "react";
import axios from "axios";
import { socket } from "@/lib/socket";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddRecordModal() {
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!amount || !category) return;

    await axios.post("/api/record", {
      amount: Number(amount),
      type,
      category,
      note,
    });

    socket.emit("data-changed");

    setAmount("");
    setCategory("");
    setNote("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <Button>+ Add Record</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Input
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button onClick={handleSubmit} className="w-full">
          Save
        </Button>

      </DialogContent>
    </Dialog>
  );
}