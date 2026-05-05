import { useState } from "react";
import { advogadosMock, type Advogado } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Briefcase } from "lucide-react";
import { toast } from "sonner";

const Advogados = () => {
  const [advogados, setAdvogados] = useState<Advogado[]>(advogadosMock);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nome: "", cpf: "", email: "" });

  const handleAdd = () => {
    if (!form.nome || !form.cpf || !form.email) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setAdvogados([...advogados, { ...form, id: Date.now().toString() }]);
    setShowAdd(false);
    setForm({ nome: "", cpf: "", email: "" });
    toast.success("Advogado cadastrado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Advogados</h1>
        <Button onClick={() => { setForm({ nome: "", cpf: "", email: "" }); setShowAdd(true); }} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Advogado
        </Button>
      </div>

      {advogados.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">Nenhum advogado cadastrado</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">CPF</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advogados.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">
                    {a.nome}
                    <div className="sm:hidden text-xs text-muted-foreground mt-1 space-y-0.5">
                      <div>{a.cpf}</div>
                      <div className="truncate">{a.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{a.cpf}</TableCell>
                  <TableCell className="hidden md:table-cell">{a.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Advogado</DialogTitle>
            <DialogDescription>Preencha os dados para cadastrar um novo advogado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>CPF *</Label>
              <Input value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAdd}>Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Advogados;