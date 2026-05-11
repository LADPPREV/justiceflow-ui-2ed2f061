import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clientesMock, type Movimentacao, type Cliente } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Calendar, User, FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ClienteDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteBase = clientesMock.find((c) => c.id === id);

  const [cliente, setCliente] = useState<Cliente | undefined>(clienteBase);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(
    clienteBase?.movimentacoes || []
  );

  const [showMovForm, setShowMovForm] = useState(false);
  const [editingMov, setEditingMov] = useState<Movimentacao | null>(null);
  const [movForm, setMovForm] = useState({ titulo: "", descricao: "", data: "" });

  const [viewMov, setViewMov] = useState<Movimentacao | null>(null);
  const [deleteMov, setDeleteMov] = useState<Movimentacao | null>(null);

  const [showEditCliente, setShowEditCliente] = useState(false);
  const [clienteForm, setClienteForm] = useState({
    nome: clienteBase?.nome || "",
    cpf: clienteBase?.cpf || "",
    senhaINSS: clienteBase?.senhaINSS || "",
    beneficioDesejado: clienteBase?.beneficioDesejado || "",
    agenteCaso: clienteBase?.agenteCaso || "",
    indicadoPor: clienteBase?.indicadoPor || "",
  });
  const [showDeleteCliente, setShowDeleteCliente] = useState(false);

  if (!cliente) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">Cliente não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/clientes")}>
          Voltar
        </Button>
      </div>
    );
  }

  const openNewMov = () => {
    setEditingMov(null);
    setMovForm({ titulo: "", descricao: "", data: "" });
    setShowMovForm(true);
  };

  const openEditMov = (mov: Movimentacao) => {
    setEditingMov(mov);
    setMovForm({ titulo: mov.titulo, descricao: mov.descricao, data: mov.data });
    setViewMov(null);
    setShowMovForm(true);
  };

  const handleSaveMov = () => {
    if (!movForm.titulo || !movForm.descricao || !movForm.data) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (editingMov) {
      setMovimentacoes(
        movimentacoes.map((m) =>
          m.id === editingMov.id ? { ...m, ...movForm } : m
        )
      );
      toast.success("Movimentação atualizada!");
    } else {
      const nova: Movimentacao = {
        id: Date.now().toString(),
        ...movForm,
        advogado: "Dr. Carlos Mendes",
      };
      setMovimentacoes([...movimentacoes, nova]);
      toast.success("Movimentação adicionada!");
    }
    setShowMovForm(false);
    setEditingMov(null);
  };

  const handleDeleteMov = () => {
    if (!deleteMov) return;
    setMovimentacoes(movimentacoes.filter((m) => m.id !== deleteMov.id));
    setDeleteMov(null);
    setViewMov(null);
    toast.success("Movimentação excluída!");
  };

  const handleEditCliente = () => {
    if (!clienteForm.nome || !clienteForm.cpf || !clienteForm.beneficioDesejado) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    const isIndicacao = clienteForm.agenteCaso.trim().toLowerCase() === "indicação" || clienteForm.agenteCaso.trim().toLowerCase() === "indicacao";
    setCliente({
      ...cliente,
      ...clienteForm,
      indicadoPor: isIndicacao ? clienteForm.indicadoPor : undefined,
    });
    setShowEditCliente(false);
    toast.success("Cliente atualizado com sucesso!");
  };

  const handleDeleteCliente = () => {
    const idx = clientesMock.findIndex((c) => c.id === cliente.id);
    if (idx >= 0) clientesMock.splice(idx, 1);
    toast.success("Cliente excluído com sucesso!");
    navigate("/clientes");
  };

  const sorted = [...movimentacoes].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/clientes")} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Clientes
      </Button>

      <h1 className="text-2xl font-bold text-foreground break-words">{cliente.nome}</h1>

      {/* Dados Cadastrais */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 space-y-0">
          <CardTitle className="text-lg">Dados Cadastrais</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outline" onClick={() => {
              setClienteForm({
                nome: cliente.nome,
                cpf: cliente.cpf,
                senhaINSS: cliente.senhaINSS,
                beneficioDesejado: cliente.beneficioDesejado,
                agenteCaso: cliente.agenteCaso || "",
                indicadoPor: cliente.indicadoPor || "",
              });
              setShowEditCliente(true);
            }} className="w-full sm:w-auto">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setShowDeleteCliente(true)} className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nome</span>
              <p className="font-medium">{cliente.nome}</p>
            </div>
            <div>
              <span className="text-muted-foreground">CPF</span>
              <p className="font-medium">{cliente.cpf}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Senha INSS</span>
              <p className="font-medium">{cliente.senhaINSS || "—"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Benefício Desejado</span>
              <p className="font-medium">{cliente.beneficioDesejado}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Agente do Caso</span>
              <p className="font-medium">
                {cliente.agenteCaso || "—"}
                {cliente.indicadoPor ? (
                  <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                    Indicado por: {cliente.indicadoPor}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movimentações */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 space-y-0">
          <CardTitle className="text-lg">Movimentações do Processo</CardTitle>
          <Button size="sm" onClick={openNewMov} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nova Movimentação
          </Button>
        </CardHeader>
        <CardContent>
          {sorted.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Nenhuma movimentação registrada.</p>
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-border space-y-6">
              {sorted.map((mov) => (
                <div key={mov.id} className="relative">
                  <div className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-card" />
                  <button
                    type="button"
                    onClick={() => setViewMov(mov)}
                    className="w-full text-left rounded-md p-2 -m-2 hover:bg-muted/60 transition-colors"
                  >
                    <p className="font-medium text-sm text-foreground break-words whitespace-normal">
                      {mov.titulo}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(mov.data).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {mov.advogado}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Movimentação Dialog */}
      <Dialog open={!!viewMov} onOpenChange={(o) => !o && setViewMov(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="break-words whitespace-normal pr-6">
              {viewMov?.titulo}
            </DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {viewMov && new Date(viewMov.data).toLocaleDateString("pt-BR")}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {viewMov?.advogado}
              </span>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-foreground whitespace-pre-wrap break-words">
            {viewMov?.descricao}
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => viewMov && openEditMov(viewMov)}>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => viewMov && setDeleteMov(viewMov)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Movimentação Dialog */}
      <Dialog open={showMovForm} onOpenChange={setShowMovForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMov ? "Editar Movimentação" : "Nova Movimentação"}</DialogTitle>
            <DialogDescription>
              {editingMov ? "Altere os dados da movimentação." : "Registre uma nova movimentação para este processo."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título *</Label>
              <Input
                value={movForm.titulo}
                onChange={(e) => setMovForm({ ...movForm, titulo: e.target.value })}
                placeholder="Ex: Perícia agendada"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição *</Label>
              <Textarea
                value={movForm.descricao}
                onChange={(e) => setMovForm({ ...movForm, descricao: e.target.value })}
                placeholder="Descreva a movimentação..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Data *</Label>
              <Input type="date" value={movForm.data} onChange={(e) => setMovForm({ ...movForm, data: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Advogado Responsável</Label>
              <Input value={editingMov?.advogado || "Dr. Carlos Mendes"} disabled className="bg-muted" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveMov}>{editingMov ? "Salvar" : "Adicionar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Movimentação Confirmation */}
      <Dialog open={!!deleteMov} onOpenChange={(o) => !o && setDeleteMov(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a movimentação <strong>{deleteMov?.titulo}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteMov(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteMov}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Cliente Dialog */}
      <Dialog open={showEditCliente} onOpenChange={setShowEditCliente}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Altere os dados do cliente.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={clienteForm.nome} onChange={(e) => setClienteForm({ ...clienteForm, nome: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>CPF *</Label>
              <Input value={clienteForm.cpf} onChange={(e) => setClienteForm({ ...clienteForm, cpf: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Senha INSS</Label>
              <Input value={clienteForm.senhaINSS} onChange={(e) => setClienteForm({ ...clienteForm, senhaINSS: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Benefício Desejado *</Label>
              <Input value={clienteForm.beneficioDesejado} onChange={(e) => setClienteForm({ ...clienteForm, beneficioDesejado: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Agente do Caso</Label>
              <Input
                value={clienteForm.agenteCaso}
                onChange={(e) => setClienteForm({ ...clienteForm, agenteCaso: e.target.value })}
                placeholder="Ex: Indicação, Instagram, Facebook..."
              />
            </div>
            {clienteForm.agenteCaso.trim().toLowerCase() === "indicação" || clienteForm.agenteCaso.trim().toLowerCase() === "indicacao" ? (
              <div className="space-y-2">
                <Label>Indicado por</Label>
                <Input
                  value={clienteForm.indicadoPor}
                  onChange={(e) => setClienteForm({ ...clienteForm, indicadoPor: e.target.value })}
                  placeholder="Nome de quem indicou"
                />
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button onClick={handleEditCliente}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Cliente Confirmation */}
      <Dialog open={showDeleteCliente} onOpenChange={setShowDeleteCliente}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cliente <strong>{cliente.nome}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteCliente(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteCliente}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClienteDetalhe;
