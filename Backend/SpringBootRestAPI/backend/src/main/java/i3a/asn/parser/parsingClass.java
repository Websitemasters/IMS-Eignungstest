/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package i3a.asn.parser;

import java.util.HashMap;
import org.typemeta.funcj.data.Chr;
import org.typemeta.funcj.functions.Functions.Op;
import org.typemeta.funcj.functions.Functions.Op2;
import static org.typemeta.funcj.parser.Combinators.choice;
import org.typemeta.funcj.parser.Input;
import org.typemeta.funcj.parser.Parser;
import org.typemeta.funcj.parser.Ref;
import static org.typemeta.funcj.parser.Text.chr;
import static org.typemeta.funcj.parser.Text.intr;


/**
 *
 * @author 1810g
 */
public class parsingClass {
	Singleton singleton=Singleton.getInstance();

private Op<Integer> goBack(){
	if(!singleton.isValid()){
	singleton.resetX();
	}
	System.out.println("Singleton state: "+singleton.isValid());

	return null;
}


enum BinOp {
    ADD {Op2<Integer> op() {return (l, r) -> l + r;}},
    SUB {Op2<Integer> op() {return (l, r) -> l - r;}},
    MUL {Op2<Integer> op() {return (l, r) -> l * r;}},
    DIV {Op2<Integer> op() {return (l, r) -> l / r;}};
    
    abstract Op2<Integer> op();
};	




enum CompOp {
    GT {Op2<Integer> cp() {return (l, r) -> (l > r)?1:0;}},
    ST {Op2<Integer> cp() {return (l, r) -> (l<r)?1:0;}},
    EQ {Op2<Integer> cp() {return (l, r) -> (l==r)?1:0;}},
    NEQ {Op2<Integer> cp() {return (l, r) -> (l!=r)?1:0;}};
    
    abstract Op2<Integer> cp();
};	



Ref<Chr, Op<Integer>> expr = Parser.ref();
Ref<Chr, Op<Integer>> pars = Parser.ref();

// VAR ::= 'x'
Parser<Chr, Op<Integer>> var = chr('x').map(u -> x -> x);

	


// NUM ::= <integer>
Parser<Chr, Op<Integer>> num = intr.map(i -> x -> i);



// BINOP ::= '+' | '-' | '*' | '/' | '='
Parser<Chr, BinOp> binOp =
        choice(
                chr('#').map(c -> BinOp.ADD),
                chr('-').map(c -> BinOp.SUB),
                chr('*').map(c -> BinOp.MUL),
                chr('/').map(c -> BinOp.DIV)
        );

// BINEXPR ::= '(' EXPR BINOP EXPR ')'
Parser<Chr, Op<Integer>> binExpr =
        chr('(')
                .andR(expr)
                .and(binOp)
                .and(expr)
                .andL(chr(')'))
                .map(lhs -> bo -> rhs -> x -> bo.op().apply(lhs.apply(x), rhs.apply(x)));


//DECL::=VAR '=' NUM 
Parser <Chr,Op<Integer>> decl=var.and(chr('=')).and(expr).map(v-> c-> n-> declMeth(n));
private Op<Integer>declMeth(Op<Integer> op){
singleton.setX(op.apply(singleton.getX()));

return op;
}

//RETEX::= 'return' EXPR
 Parser<Chr, Op<Integer>> retex=chr('r').and(chr('e')).and(chr('t')).and(chr('u')).and(chr('r')).and(chr('n')).and(chr(' ')).and(expr).map(r->e->t->u->z->n->s->p->p);

//VEXPR:= DECL || RETEX
Ref<Chr, Op<Integer>> vexpr = Parser.ref();


//VCOM::= RETEX || MEXPR
Ref<Chr,Op<Integer>> vcom=Parser.ref();

//MEXP::=VEXPR ' ' VCOM
Parser<Chr,Op<Integer>>mexpr=vexpr.and(chr(' ')).and(vcom).map(d->s->e->e);

//COND::= '>' | '<' | '==' | '!='
Parser<Chr, CompOp> compOp =
        choice(
                chr('!').map(c -> CompOp.GT),
                chr('_').map(c -> CompOp.ST),
                chr('=').andL(chr('=')).map(c -> CompOp.EQ),
                chr('!').andL(chr('=')).map(c -> CompOp.NEQ)
        );
//CONEXPR::='(' EXPR COMPOP EXPR ')'
Parser<Chr, Op<Integer>> conExpr =
        chr('(')
                .andR(expr)
                .and(compOp)
                .and(expr)
                .andL(chr(')'))
                .map(lhs -> dp -> rhs -> x -> trueOrFalse(dp.cp().apply(lhs.apply(0), rhs.apply(x))));


private int trueOrFalse(int u){
	singleton.setValid(u==0);
	System.out.println("u: "+u);
	return u;
}

//IFEXPR::='if' CONEXPR '{' VEXPR '}'
Op<Integer> nullOp=num.parse(Input.of("0")).getOrThrow();
Parser<Chr,Op<Integer>> ifexpr=chr('i').andL(chr('f')).and(conExpr).andL(chr('{')).and(vexpr).andL(chr('}')).map(i->c->v->goBack());


public parsingClass(){

// EXPR ::= VAR | NUM | BINEXPR
expr.set(choice(var, num, binExpr));
vexpr.set(choice(ifexpr,retex, decl));
vcom.set(choice(retex,mexpr));
pars.set(choice(mexpr,vexpr));

}


public int parseeeInt(String s){
	Op<Integer>eval=pars.parse(Input.of(s)).getOrThrow();
	int i=eval.apply(singleton.getX());
	return i;
}


}
