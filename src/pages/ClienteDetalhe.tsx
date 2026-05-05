import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clientesMock, type Movimentacao } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Calendar, User, FileText } from "lucide-react";
import { toast } from "sonner";

const ClienteDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteBase = clientesMock.find((c) => c.id === id);

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(
    clienteBase?.movimentacoes || []
  );
  const [showAdd, setShowAdd] = useState(false);
  const [novaDesc, setNovaDesc] = useState("");
  const [novaData, setNovaData] = useState("");

  if (!clienteBase) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">Cliente não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/clientes")}>
          Voltar
        </Button>
      </div>
    );
  }

  const handleAddMov = () => {
    if (!novaDesc || !novaData) {
      toast.error("Preencha todos os campos.");
      return;
    }
    const nova: Movimentacao = {
      id: Date.now().toString(),
      descricao: novaDesc,
      data: novaData,
      advogado: "Dr. Carlos Mendes",
    };
    setMovimentacoes([...movimentacoes, nova].sort((a, b) => a.data.localeCompare(b.data)));
    setShowAdd(false);
    setNovaDesc("");
    setNovaData("");
    toast.success("Movimentação adicionada!");
  };

  const sorted = [...movimentacoes].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/clientes")} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Clientes
      </Button>

      <h1 className="text-2xl font-bold text-foreground break-words">{clienteBase.nome}</h1>

      {/* Dados Cadastrais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados Cadastrais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nome</span>
              <p className="font-medium">{clienteBase.nome}</p>
            </div>
            <div>
              <span className="text-muted-foreground">CPF</span>
              <p className="font-medium">{clienteBase.cpf}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Senha INSS</span>
              <p className="font-medium">{clienteBase.senhaINSS || "—"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Benefício Desejado</span>
              <p className="font-medium">{clienteBase.beneficioDesejado}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movimentações */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 space-y-0">
          <CardTitle className="text-lg">Movimentações do Processo</CardTitle>
          <Button size="sm" onClick={() => setShowAdd(true)} className="w-full sm:w-auto">
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
                  <div className="absolute -left-[1.85rem] top-1 h-3 w-3 rounded-full bg-primary border-2 border-card" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-foreground">{mov.descricao}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(mov.data).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {mov.advogado}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Movimentação Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Movimentação</DialogTitle>
            <DialogDescription>Registre uma nova movimentação para este processo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Descrição *</Label>
              <Textarea value={novaDesc} onChange={(e) => setNovaDesc(e.target.value)} placeholder="Descreva a movimentação..." />
            </div>
            <div className="space-y-2">
              <Label>Data *</Label>
              <Input type="date" value={novaData} onChange={(e) => setNovaData(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Advogado Responsável</Label>
              <Input value="Dr. Carlos Mendes" disabled className="bg-muted" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddMov}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClienteDetalhe;