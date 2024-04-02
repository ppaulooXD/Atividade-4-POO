class Contribuinte {
    constructor(nome, documento, rendaBruta) {
        this.nome = nome;
        this.documento = documento;
        this.rendaBruta = rendaBruta;
    }

    calcImposto() {
        return 0;
    }
}

class PessoaFisica extends Contribuinte {
    constructor(nome, documento, rendaBruta, sexo) {
        super(nome, documento, rendaBruta);
        this.sexo = sexo;
    }

    calcImposto() {
        if (this.rendaBruta <= 1400) {
            return 0;
        } else if (this.rendaBruta <= 2100) {
            return this.rendaBruta * 0.1 - 100;
        } else if (this.rendaBruta <= 2800) {
            return this.rendaBruta * 0.15 - 270;
        } else if (this.rendaBruta <= 3600) {
            return this.rendaBruta * 0.25 - 500;
        } else {
            return this.rendaBruta * 0.3 - 700;
        }
    }
}

class PessoaJuridica extends Contribuinte {
    constructor(nome, documento, rendaBruta, anoDeFundacao) {
        super(nome, documento, rendaBruta);
        this.anoDeFundacao = anoDeFundacao;
    }

    calcImposto() {
        return this.rendaBruta * 0.1;
    }
}

class GrupoDeContribuintes {
    constructor() {
        this.contribuintes = [];
    }

    addContribuinte(contribuinte) {
        this.contribuintes.push(contribuinte);
    }

    getTotalImposto() {
        let totalImposto = 0;
        this.contribuintes.forEach(contribuinte => {
            totalImposto += contribuinte.calcImposto();
        });
        return totalImposto;
    }

    getPorcentagemContribuintesFeminino() {
        const totalContribuintes = this.contribuintes.length;
        const totalFeminino = this.contribuintes.filter(contribuinte => {
            return contribuinte instanceof PessoaFisica && contribuinte.sexo === 'Feminino';
        }).length;
        return (totalFeminino / totalContribuintes) * 100;
    }
}

// Exemplo
const pessoaFisica1 = new PessoaFisica('Alessandra', '14826321051', 2500, 'Feminino');
const pessoaJuridica1 = new PessoaJuridica('Empresa ABC', '13956987000152', 50000, 2000);

const grupoContribuintes = new GrupoDeContribuintes();
grupoContribuintes.addContribuinte(pessoaFisica1);
grupoContribuintes.addContribuinte(pessoaJuridica1);

console.log("Total de imposto devido pelo grupo:", grupoContribuintes.getTotalImposto());
console.log("Porcentagem de contribuintes do sexo feminino:", grupoContribuintes.getPorcentagemContribuintesFeminino());
