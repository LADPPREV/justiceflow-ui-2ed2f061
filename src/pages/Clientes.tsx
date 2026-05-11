import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientesMock, type Cliente } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Users } from "lucide-react";

const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [busca, setBusca] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nome: "", cpf: "", senhaINSS: "", beneficioDesejado: "", agenteCaso: "", indicadoPor: "" });

  const filtered = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca)
  );

  const resetForm = () => setForm({ nome: "", cpf: "", senhaINSS: "", beneficioDesejado: "", agenteCaso: "", indicadoPor: "" });

  const handleAdd = () => {
    if (!form.nome || !form.cpf || !form.beneficioDesejado || !form.agenteCaso) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    const novo: Cliente = {
      ...form,
      indicadoPor: form.agenteCaso === "Indicação" ? form.indicadoPor : undefined,
      id: Date.now().toString(),
      movimentacoes: [],
    };
    setClientes([...clientes, novo]);
    setShowAdd(false);
    resetForm();
    toast.success("Cliente cadastrado com sucesso!");
  };

  const formFields = (
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
        <Label>Senha INSS</Label>
        <Input value={form.senhaINSS} onChange={(e) => setForm({ ...form, senhaINSS: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Benefício Desejado *</Label>
        <Input value={form.beneficioDesejado} onChange={(e) => setForm({ ...form, beneficioDesejado: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Agente do Caso *</Label>
        <Input
          value={form.agenteCaso}
          onChange={(e) => setForm({ ...form, agenteCaso: e.target.value })}
          placeholder="Ex: Indicação, Instagram, Facebook..."
        />
      </div>
      {form.agenteCaso.trim().toLowerCase() === "indicação" || form.agenteCaso.trim().toLowerCase() === "indicacao" ? (
        <div className="space-y-2">
          <Label>Indicado por</Label>
          <Input
            value={form.indicadoPor}
            onChange={(e) => setForm({ ...form, indicadoPor: e.target.value })}
            placeholder="Nome de quem indicou"
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
        <Button onClick={() => { resetForm(); setShowAdd(true); }} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">Nenhum cliente encontrado</p>
          <p className="text-sm">Tente buscar por outro termo ou cadastre um novo cliente.</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">CPF</TableHead>
                <TableHead className="hidden md:table-cell">Benefício Desejado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  onClick={() => navigate(`/clientes/${c.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {c.nome}
                    <div className="sm:hidden text-xs text-muted-foreground mt-1">{c.cpf}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{c.cpf}</TableCell>
                  <TableCell className="hidden md:table-cell">{c.beneficioDesejado}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <ChevronRight className="h-4 w-4 inline-block text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>Preencha os dados para cadastrar um novo cliente.</DialogDescription>
          </DialogHeader>
          {formFields}
          <DialogFooter>
            <Button onClick={handleAdd}>Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clientes;